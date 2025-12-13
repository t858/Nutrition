/**
 * TanStack Query hooks for Strapi content types
 *
 * Provides React Query hooks for fetching data from Strapi CMS.
 * Each hook uses the Strapi client to fetch data with proper caching and error handling.
 */

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { strapiClient, StrapiQueryParams, StrapiResponse } from "./client";

// Query keys factory for better organization
export const strapiQueryKeys = {
  all: ["strapi"] as const,
  singleTypes: () => [...strapiQueryKeys.all, "single-types"] as const,
  singleType: (type: string, params?: StrapiQueryParams) =>
    [...strapiQueryKeys.singleTypes(), type, params] as const,
  collections: () => [...strapiQueryKeys.all, "collections"] as const,
  collection: (type: string, params?: StrapiQueryParams) =>
    [...strapiQueryKeys.collections(), type, params] as const,
  entry: (type: string, id: string | number, params?: StrapiQueryParams) =>
    [...strapiQueryKeys.collection(type, params), id] as const,
};

/**
 * Hook to fetch the about page from Strapi
 */
export function useAboutPage<T = unknown>(
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.singleType("about-page", params),
    queryFn: () => strapiClient.fetchSingleType<T>("about-page", params),
    ...options,
  });
}

/**
 * Hook to fetch the contact page from Strapi
 */
export function useContactPage<T = unknown>(
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.singleType("contact-page", params),
    queryFn: () => strapiClient.fetchSingleType<T>("contact-page", params),
    ...options,
  });
}

/**
 * Hook to fetch the FAQ page from Strapi
 */
export function useFaqPage<T = unknown>(
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.singleType("faq-page", params),
    queryFn: () => strapiClient.fetchSingleType<T>("faq-page", params),
    ...options,
  });
}

/**
 * Hook to fetch the specialization page from Strapi
 */
export function useSpecializationPage<T = unknown>(
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.singleType("specialization-page", params),
    queryFn: () =>
      strapiClient.fetchSingleType<T>("specialization-page", params),
    ...options,
  });
}

/**
 * Generic hook to fetch any single type from Strapi
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useSingleType('custom-page', { populate: 'deep' });
 * ```
 */
export function useSingleType<T = unknown>(
  contentType: string,
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.singleType(contentType, params),
    queryFn: () => strapiClient.fetchSingleType<T>(contentType, params),
    ...options,
  });
}

/**
 * Generic hook to fetch a collection type from Strapi
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useCollectionType('articles', { populate: 'deep' });
 * ```
 */
export function useCollectionType<T = unknown>(
  contentType: string,
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T[]>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.collection(contentType, params),
    queryFn: () => strapiClient.fetchCollectionType<T>(contentType, params),
    ...options,
  });
}

/**
 * Generic hook to fetch a single entry by ID from a collection type
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useEntryById('articles', '1', { populate: 'deep' });
 * ```
 */
export function useEntryById<T = unknown>(
  contentType: string,
  id: string | number,
  params?: StrapiQueryParams,
  options?: Omit<UseQueryOptions<StrapiResponse<T>>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey: strapiQueryKeys.entry(contentType, id, params),
    queryFn: () => strapiClient.fetchEntryById<T>(contentType, id, params),
    enabled: !!id,
    ...options,
  });
}
