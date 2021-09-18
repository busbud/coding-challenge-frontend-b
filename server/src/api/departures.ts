import { FastifyInstance } from "fastify";
import { fetchDepartures } from "../datasource/busbud";

export default async function departuresRoutes(fastify: FastifyInstance) {
  fastify.get<{
    Params: { origin: string; dest: string; date: string };
    Querystring: Partial<{ adults: number; children: number; senior: number }>;
  }>("/api/departures/from/:origin/to/:dest/date/:date", {
    schema: {
      params: {
        origin: { type: "string" },
        dest: { type: "string" },
        date: { type: "string" },
      },
      querystring: {
        adults: { type: "number" },
        children: { type: "number" },
        senior: { type: "number" },
      },
    },
    attachValidation: true,
    async handler({ query, params }) {
      const options = {
        adults: typeof query.adults === "number" ? query.adults : undefined,
        children:
          typeof query.children === "number" ? query.children : undefined,
        senior: typeof query.senior === "number" ? query.senior : undefined,
      };

      return fetchDepartures(params.dest, params.origin, params.date, options);
    },
  });
}
