import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findFirst({
      where: {
        id: ctx.user.id,
      },
    });
  }),
});
