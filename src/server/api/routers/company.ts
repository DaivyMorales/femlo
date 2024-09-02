import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const companyRouter = createTRPCRouter({
  getCompanies: publicProcedure.query(async ({ ctx }) => {
    const allSpaces = await ctx.db.company.findMany();
    return allSpaces;
  }),

  getCompanyById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const company = await ctx.db.company.findUnique({
        where: { id: input.id },
      });

      if (!company) {
        throw new Error(`Company with id ${input.id} not found.`);
      }

      return company;
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
            { id: { contains: input.query, mode: "insensitive" } },
          ],
        },
      });
      return companies;
    }),
});
