// src/utils/queryHelpers.ts

type QueryParams = {
    [key: string]: string | number | undefined;
  };
  
  /**
   * Converts an object of parameters to a URL query string.
   *
   * @param params - The object containing query parameters.
   * @returns A string representing the URL query.
   */
  export const convertParamsToQueryString = (params: QueryParams): string => {
    // Create an array of encoded key-value pairs
    const queryString = Object.entries(params)
      .filter(([, value]) => value !== undefined)  // Filter out undefined values
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number)}`)
      .join('&');
  
    return queryString;
  };
  