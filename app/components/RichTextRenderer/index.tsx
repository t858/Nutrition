"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Link from "next/link";

type TProps = {
  content: any[];
};

export default function RichContentRenderer({ content }: TProps) {
  const headingSizes: Record<number, string> = {
    1: "text-4xl lg:text-5xl",
    2: "text-3xl lg:text-4xl",
    3: "text-2xl lg:text-3xl",
    4: "text-xl lg:text-2xl",
    5: "text-lg lg:text-xl",
    6: "text-base lg:text-lg",
  };
  const headingTags = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
    5: "h5",
    6: "h6",
  } as const;
  return (
    <div className="font-normal text-sm lg:text-xl">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="mt-2 text-base lg:text-lg leading-relaxed">
              {children}
            </p>
          ),
          heading: ({ children, level }) => {
            const Tag = headingTags[level] ?? "h2";
            const size = headingSizes[level] || "text-2xl lg:text-3xl";
            return <Tag className={` font-bold ${size}`}>{children}</Tag>;
          },
          list: ({ children, format }) =>
            format === "unordered" ? (
              <ul className="list-disc list-inside ml-6 mt-4 text-base lg:text-lg leading-relaxed">
                {children}
              </ul>
            ) : (
              <ol className="list-decimal list-inside ml-6 mt-4 text-base lg:text-lg leading-relaxed">
                {children}
              </ol>
            ),
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 font-extrabold text-2xl text-black mt-4 w-[80%]">
              {children}
            </blockquote>
          ),
          link: ({ children, url }) => (
            <Link href={url} className="text-footer underline">
              {children}
            </Link>
          ),
        }}
        modifiers={{
          bold: ({ children }) => (
            <strong className="font-extrabold">{children}</strong>
          ),
          italic: ({ children }) => <span className="italic">{children}</span>,
        }}
      />
    </div>
  );
}
