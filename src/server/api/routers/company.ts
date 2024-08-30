import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
  //   create: publicProcedure.mutation(async ({ ctx }) => {
  //     return ctx.db.space.create({ data: { name: "" } });
  //   }),

  getCompanies: publicProcedure.query(async ({ ctx }) => {
    const allSpaces = await ctx.db.company.findMany();
    return allSpaces;
  }),

  searchCompanies: publicProcedure
    .input(
      z.object({
        query: z.string().min(1, "Search query must be at least 1 character"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const companies = await ctx.db.company.findMany({
        where: {
          OR: [
            { svgName: { contains: input.query, mode: "insensitive" } },
            { defaultSize: { contains: input.query, mode: "insensitive" } },
          ],
        },
      });
      return companies;
    }),
});
