import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spaceRouter = createTRPCRouter({
  create: publicProcedure.mutation(async ({ ctx }) => {
    return ctx.db.space.create({ data: { name: "" } });
  }),

  getSpaces: publicProcedure.query(async ({ ctx }) => {
    const allSpaces = await ctx.db.space.findMany();
    return allSpaces;
  }),
  updateSpace: publicProcedure
    .input(
      z.object({
        id: z.string(),
        companyId: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updatedSpace = await ctx.db.space.update({
        where: { id: input.id },
        data: {
          companyId: input.companyId,
        },
      });
      return updatedSpace;
    }),
});
