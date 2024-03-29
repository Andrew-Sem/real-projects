import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ projectName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.db.project.findFirst({
        where: { name: input.projectName, ownerId: ctx.user.id },
      });
      if (project)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Проект с таким именем уже существует",
        });
      const backlog = await ctx.db.backlog.create({ data: {} });
      const dbUser = await ctx.db.user.findFirst({
        where: {
          id: ctx.user.id,
        },
      });
      if (!dbUser)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Не удалось найти пользователя",
        });
      return await ctx.db.project.create({
        data: {
          name: input.projectName,
          ownerId: ctx.user.id,
          backlog: { connect: { id: backlog.id } },
          users: { connect: [dbUser] },
        },
        include: {
          users: true,
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.project.findFirst({
        where: {
          ownerId: ctx.user.id,
          id: input.id,
        },
        include: {
          users: true,
          backlog: {
            include: {
              tasks: {
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      });
    }),
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await ctx.db.user.findFirst({
      where: { id: ctx.user.id },
      include: { projects: true },
    });
    if (!dbUser)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Не удалось найти пользователя в базе",
      });
    return dbUser.projects;
  }),
  getLatestProjects: protectedProcedure.query(async ({ ctx }) => {
    const dbUser = await ctx.db.user.findFirst({
      where: { id: ctx.user.id },
      include: { projects: { orderBy: { updatedAt: "desc" }, take: 5 } },
    });
    if (!dbUser)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Не удалось найти пользователя в базе",
      });
    return dbUser.projects;
  }),
});
