import fs from "fs";
import path from "path";
import { GraphQLJSONObject } from "graphql-type-json";

export const typeDefs = fs
  .readFileSync(path.join(__dirname, "schema.graphql"))
  .toString("utf-8");

export const resolvers = {
  Query: {
    Daily: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDaily({ params });
    },
    DailyConfirmed: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDailyConfirmed({ params });
    },
    DailyRecovered: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDailyRecovered({ params });
    },
    DailyDeaths: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDailyDeaths({ params });
    },
    DailyCountries: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDailyCountries({ params });
    },
    TimeSeries: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getTimeSeries({ params });
    },
    DataSources: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDataSources({ params });
    },
    DataSourcesDetails: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDataSourcesDetails({ params });
    },
    DataSourcesTotal: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getDataSourcesTotals({ params });
    },
    Metadata: async (object, params, ctx, resolveInfo) => {
      return await ctx.dataSources.coronaAPI.getMeta();
    }
  },
  JSONObject: GraphQLJSONObject,
  CoronaDataConfirmed: {
    __resolveType: () => "CoronaData"
  },
  CoronaDataRecovered: {
    __resolveType: () => "CoronaData"
  },
  CoronaDataDeaths: {
    __resolveType: () => "CoronaData"
  }
};
