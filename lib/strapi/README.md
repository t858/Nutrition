# Strapi API Integration

This directory contains utilities and hooks for fetching data from Strapi CMS using TanStack Query.

## Setup

1. **Environment Variables**: Add these to your `.env.local` file:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_api_token_here  # Optional, for protected endpoints
```

2. **QueryProvider**: The `QueryProvider` is already set up in `app/layout.tsx`, so you can use the hooks directly in your components.

## Usage

### Basic Example

```tsx
"use client";

import { useHomePage } from "@/lib/strapi";

export default function HomePage() {
  const { data, isLoading, error } = useHomePage({
    populate: 'deep', // Populate all relations
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{data?.data?.hero?.title}</h1>
      {/* Render your content */}
    </div>
  );
}
```

### Available Hooks

#### Single Types (Pages)

- `useHomePage()` - Fetch home page content
- `useAboutPage()` - Fetch about page content
- `useContactPage()` - Fetch contact page content
- `useFaqPage()` - Fetch FAQ page content
- `useSpecializationPage()` - Fetch specialization page content

#### Generic Hooks

- `useSingleType(contentType, params?)` - Fetch any single type
- `useCollectionType(contentType, params?)` - Fetch a collection type
- `useEntryById(contentType, id, params?)` - Fetch a single entry by ID

### Query Parameters

All hooks accept a `params` object with the following options:

```tsx
{
  populate: 'deep' | ['field1', 'field2'] | { field: { populate: '*' } },
  fields: ['field1', 'field2'],
  sort: 'field:asc' | ['field1:asc', 'field2:desc'],
  filters: {
    field: { $eq: 'value' },
    // See Strapi filter documentation for more options
  },
  pagination: {
    page: 1,
    pageSize: 10,
  },
  locale: 'en', // For i18n content
  publicationState: 'live' | 'preview',
}
```

### Examples

#### Fetch with Deep Populate

```tsx
const { data } = useHomePage({
  populate: {
    hero: {
      populate: '*',
    },
    services: {
      populate: {
        icon: true,
      },
    },
  },
});
```

#### Fetch Collection with Filters

```tsx
const { data } = useCollectionType('articles', {
  filters: {
    published: { $eq: true },
    category: { $eq: 'nutrition' },
  },
  sort: 'createdAt:desc',
  pagination: {
    page: 1,
    pageSize: 10,
  },
});
```

#### Fetch Single Entry

```tsx
const { data } = useEntryById('articles', '1', {
  populate: 'deep',
});
```

### TypeScript Support

You can provide TypeScript types for better autocomplete:

```tsx
interface HomePageData {
  hero: {
    title: string;
    description: string;
  };
  // ... other fields
}

const { data } = useHomePage<HomePageData>({
  populate: 'deep',
});
```

### Query Options

All hooks accept standard TanStack Query options:

```tsx
const { data } = useHomePage(
  { populate: 'deep' },
  {
    enabled: shouldFetch,
    refetchInterval: 60000, // Refetch every minute
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  }
);
```

## API Client

You can also use the client directly if needed:

```tsx
import { strapiClient } from '@/lib/strapi';

// In a server component or API route
const response = await strapiClient.fetchSingleType('home-page', {
  populate: 'deep',
});
```








