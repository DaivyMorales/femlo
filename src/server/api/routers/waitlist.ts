import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const waitlistRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.waitlist.create({
        data: {
          email: input.email,
        },
      });
    }),

  getWaitlistNumber: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.db.waitlist.count();
    return count;
  }),
});
