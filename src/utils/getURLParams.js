/**
 * This is used to generate a custom URL param
 * @param params
 * @returns {string}
 */
 const getURLParams = (params) =>
 Object.keys(params || {}).reduce((result, field) => {
   if (params[field] || params[field] === 0) {
     result += result
       ? `&${field}=${params[field]}`
       : `?${field}=${params[field]}`;
   }
   return result;
 }, "");

export default getURLParams;