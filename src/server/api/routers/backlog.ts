import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const backlogRouter = createTRPCRouter({
  getByProjectId: protectedProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
      }),
    )
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.project.findFirst({
        where: { id: input.projectId },
        include: { backlog: { include: { tasks: true } } },
      });
      return project?.backlog;
    }),
});
