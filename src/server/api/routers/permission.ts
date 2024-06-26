import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const permissionRouter = createTRPCRouter({
  updateRole: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        userId: z.string(),
        role: z.enum(["admin", "user"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      input.role;
      await ctx.db.projectUserPermission.update({
        where: {
          projectId_userId: {
            projectId: input.projectId,
            userId: input.userId,
          },
        },
        data: {
          role: input.role,
        },
      });
    }),
  getPermissionByProject: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.projectUserPermission.findFirst({
        where: {
          userId: ctx.user.id,
          projectId: input.projectId,
        },
      });
    }),
});
