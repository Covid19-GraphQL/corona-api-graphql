import { RESTDataSource } from "apollo-datasource-rest";
import { buildQueryParams, convertBooleanToInteger } from "./utils";

export class CoronaAPIDataSource extends RESTDataSource {
  constructor({ baseURL }) {
    super();
    this.baseURL = baseURL;
  }
  async getDaily({ params }) {
    params = convertBooleanToInteger({
      params,
      name: "countryLevelOnly"
    });
    return await this.get(`daily${buildQueryParams({ params })}`);
  }
  async getDailyConfirmed({ params }) {
    return await this.get(`daily/confirmed${buildQueryParams({ params })}`);
  }
  async getDailyRecovered({ params }) {
    return await this.get(`daily/recovered${buildQueryParams({ params })}`);
  }
  async getDailyDeaths({ params }) {
    return await this.get(`daily/deaths${buildQueryParams({ params })}`);
  }
  async getDailyCountries({ params }) {
    return await this.get(`countries${buildQueryParams({ params })}`);
  }
  async getTimeSeries({ params }) {
    return await this.get(`timespan${buildQueryParams({ params })}`);
  }
  async getDataSources() {
    return await this.get(`datasources`);
  }
  async getDataSourcesDetails() {
    return await this.get(`datasources/details`);
  }
  async getDataSourcesTotal() {
    return await this.get(`total`);
  }
  async getMeta() {
    return await this.get(`meta`);
  }
}
