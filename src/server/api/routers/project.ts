import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ projectName: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const project = await ctx.db.project.findFirst({
        where: { name: input.projectName },
      });
      if (project)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Проект с таким именем уже существует",
        });
      const backlog = await ctx.db.backlog.create({ data: {} });
      return await ctx.db.project.create({
        data: {
          name: input.projectName,
          ownerId: ctx.user.id,
          backlog: { connect: { id: backlog.id } },
          users: [ctx.user.id],
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
      });
    }),
});
