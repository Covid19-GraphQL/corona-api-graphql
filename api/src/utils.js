import "url-search-params-polyfill";

export const buildQueryParams = ({ params = {} }) => {
  const paramsStr = new URLSearchParams(params).toString();
  return paramsStr ? `?${paramsStr}` : paramsStr;
};

export const convertBooleanToInteger = ({ params = {}, name = "" }) => {
  const value = params[name];
  if (typeof value === "boolean") {
    params[name] = value.toNumber();
  }
  return params;
};
