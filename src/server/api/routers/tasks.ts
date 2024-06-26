import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        sprintId: z.string().optional(),
        name: z.string(),
        description: z.string().optional(),
        due: z.date().optional(),
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.create({
        data: {
          userId: ctx.user.id,
          ...input,
        },
      });
      return task;
    }),
  getAllByProjectId: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.task.findMany({
        where: {
          projectId: input.projectId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),
  // update: protectedProcedure
  //   .input(
  //     z
  //       .object({
  //         name: z.string(),
  //         description: z.string(),
  //         backlogId: z.string(),
  //         due: z.date(),
  //         status: z.enum(["К выполнению", "В процессе", "Готово"]),
  //         sprintId: z.string(),
  //       })
  //       .partial()
  //       .extend({ id: z.string() }),
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     await ctx.db.task.update({
  //       where: {
  //         id: input.id,
  //       },
  //       data: input,
  //     });
  //   }),
});
