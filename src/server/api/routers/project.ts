import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { generateRandomId } from "@/utils/generateRandomId";

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
          members: { connect: [dbUser] },
          inviteLinkId: generateRandomId(20),
        },
        include: {
          members: true,
        },
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.project.findFirst({
        where: {
          id: input.id,
        },
        include: {
          members: true,
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
  getMembers: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findFirst({
        where: {
          id: input.id,
        },
        include: {
          members: true,
        },
      });
      if (!project)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Не удалось найти проект",
        });
      return project.members;
    }),
  getByInviteLinkId: protectedProcedure
    .input(z.object({ inviteLinkId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.project.findFirst({
        where: { inviteLinkId: input.inviteLinkId },
        include: {
          members: true,
        },
      });
    }),
  acceptInvite: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.update({
        where: {
          id: input.id,
        },
        data: {
          members: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
    }),
});
