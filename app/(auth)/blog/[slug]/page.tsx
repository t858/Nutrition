import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Helper function to get image URL from Strapi
const getImageUrl = (image: any): string | null => {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (image.url) return image.url;
  if (image.data?.attributes?.url) return image.data.attributes.url;
  if (image.attributes?.url) return image.attributes.url;
  if (Array.isArray(image.data) && image.data[0]?.attributes?.url) {
    return image.data[0].attributes.url;
  }
  return null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `${strapiUrl}/api/blog-posts?filters[slug][$eq]=${slug}&populate[Image]=*`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    const postData = await res.json();
    const post = postData?.data?.[0];

    if (!post) {
      return {
        title: "Blog Post not found",
        description: "The requested blog post could not be found.",
      };
    }

    const title = post.title || "Blog Post";
    const description = post.description || "Read this blog post";
    const imageUrl = getImageUrl(post.Image || post.image);
    const fullImageUrl = imageUrl
      ? imageUrl.startsWith("http")
        ? imageUrl
        : `${strapiUrl}${imageUrl}`
      : undefined;

    return {
      title: `${title}`,
      description,
      openGraph: {
        title,
        description,
        images: fullImageUrl
          ? [
              {
                url: fullImageUrl,
                width: 1200,
                height: 700,
              },
            ]
          : [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: fullImageUrl ? [fullImageUrl] : [],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Read this blog post",
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
