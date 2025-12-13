/**
 * Strapi API Client
 *
 * A utility for making requests to the Strapi CMS API.
 * Handles authentication, error handling, and response parsing.
 */

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || "";

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

export type StrapiQueryParams = {
  populate?: string | string[] | object;
  fields?: string[];
  sort?: string | string[];
  filters?: Record<string, unknown>;
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  locale?: string;
  publicationState?: "live" | "preview";
};

/**
 * Recursively appends nested keys to URLSearchParams (Strapi-compatible)
 */
function appendNested(searchParams: URLSearchParams, key: string, value: any) {
  if (value === undefined || value === null) return;

  // Simple values
  if (["string", "number", "boolean"].includes(typeof value)) {
    searchParams.append(key, String(value));
    return;
  }

  // Arrays → append multiple keys
  if (Array.isArray(value)) {
    value.forEach((v) => {
      appendNested(searchParams, `${key}[]`, v);
    });
    return;
  }

  // Objects → recurse into nested keys
  if (typeof value === "object") {
    Object.entries(value).forEach(([childKey, childValue]) => {
      appendNested(searchParams, `${key}[${childKey}]`, childValue);
    });
  }
}

/**
 * Builds a query string from Strapi query parameters (fixed deep populate)
 */
function buildQueryString(params: StrapiQueryParams): string {
  const searchParams = new URLSearchParams();

  // ----- POPULATE -----
  if (params.populate) {
    if (typeof params.populate === "string") {
      // populate=logo
      searchParams.append("populate[0]", params.populate);
    } else if (Array.isArray(params.populate)) {
      // populate[0]=logo, populate[1]=hero
      params.populate.forEach((field, index) => {
        searchParams.append(`populate[${index}]`, field);
      });
    } else if (typeof params.populate === "object") {
      /**
       * For deep populate objects, flatten object keys into dot paths:
       *
       * { hero: { media: true }}  →  populate[0]=hero.media
       */
      const flatPopulate: string[] = [];

      function flatten(obj: any, prefix = "") {
        Object.entries(obj).forEach(([key, value]) => {
          const path = prefix ? `${prefix}.${key}` : key;

          if (value === true || value === "*") {
            flatPopulate.push(path);
          } else if (typeof value === "object") {
            flatten(value, path);
          }
        });
      }

      flatten(params.populate);

      flatPopulate.forEach((key, index) => {
        searchParams.append(`populate[${index}]`, key);
      });
    }
  }

  // ----- FIELDS -----
  if (params.fields) {
    params.fields.forEach((f) => searchParams.append("fields[]", f));
  }

  // ----- SORT -----
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach((s) => searchParams.append("sort[]", s));
    } else {
      searchParams.append("sort", params.sort);
    }
  }

  // ----- FILTERS -----
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      searchParams.append(`filters[${key}]`, String(value));
    });
  }

  // ----- PAGINATION -----
  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, val]) => {
      if (val !== undefined) {
        searchParams.append(`pagination[${key}]`, String(val));
      }
    });
  }

  // ----- LOCALE -----
  if (params.locale) searchParams.append("locale", params.locale);

  // ----- PUBLICATION STATE -----
  if (params.publicationState)
    searchParams.append("publicationState", params.publicationState);

  return searchParams.toString();
}

/**
 * Makes a request to the Strapi API
 */
async function strapiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const url = `${STRAPI_URL}/api${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error: StrapiError = await response.json().catch(() => ({
      error: {
        status: response.status,
        name: "FetchError",
        message: response.statusText,
      },
    }));

    throw new Error(
      `Strapi API Error: ${error.error.message || response.statusText} (${
        error.error.status
      })`
    );
  }

  console.log(response);

  return response.json();
}

/**
 * Fetches a single type from Strapi
 */
export async function fetchSingleType<T>(
  contentType: string,
  params?: StrapiQueryParams
): Promise<StrapiResponse<T>> {
  const queryString = params ? `?${buildQueryString(params)}` : "";
  return strapiRequest<T>(`/${contentType}${queryString}`);
}

/**
 * Fetches a collection type from Strapi
 */
export async function fetchCollectionType<T>(
  contentType: string,
  params?: StrapiQueryParams
): Promise<StrapiResponse<T[]>> {
  const queryString = params ? `?${buildQueryString(params)}` : "";
  return strapiRequest<T[]>(`/${contentType}${queryString}`);
}

/**
 * Fetches a single entry by ID from a collection type
 */
export async function fetchEntryById<T>(
  contentType: string,
  id: string | number,
  params?: StrapiQueryParams
): Promise<StrapiResponse<T>> {
  const queryString = params ? `?${buildQueryString(params)}` : "";
  return strapiRequest<T>(`/${contentType}/${id}${queryString}`);
}

/**
 * Strapi API client instance
 */
export const strapiClient = {
  fetchSingleType,
  fetchCollectionType,
  fetchEntryById,
};
