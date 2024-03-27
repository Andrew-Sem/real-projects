import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        sprintId: z.string().optional(),
        backlogId: z.string().optional(),
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.user.id,
          sprintId: input.sprintId,
          backlogId: input.backlogId,
        },
      });
      return task;
    }),
  getAllByBacklogId: protectedProcedure
    .input(z.object({ backlogId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.task.findMany({
        where: {
          backlogId: input.backlogId,
        },
      });
    }),
});
