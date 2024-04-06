import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const templateRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tasks = await ctx.db.task.findMany({
        where: {
          projectId: input.projectId,
        },
        select: {
          // TODO: attachments
          name: true,
          description: true,
        },
      });
      const template = await ctx.db.template.create({
        data: {
          name: input.name,
          description: input.description,
          ownerId: ctx.user.id,
        },
      });
      const templateTasks = tasks.map((task) => ({
        ...task,
        templateId: template.id,
      }));
      await ctx.db.templateTask.createMany({
        data: templateTasks,
      });
    }),
  getAllByUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.template.findMany({
      where: {
        ownerId: ctx.user.id,
      },
    });
  }),
});
