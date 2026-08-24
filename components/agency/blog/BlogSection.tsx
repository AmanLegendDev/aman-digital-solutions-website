import { connectDB } from "@/lib/db/connect";
import Blog from "@/models/Blog";

import BlogIntro from "./BlogIntro";
import BlogCard from "./BlogCard";

async function getBlogPosts() {
  await connectDB();

  const posts = await Blog.find({
    published: true,
    publishedAt: {
      $lte: new Date(),
    },
  })
    .sort({
      featured: -1,
      publishedAt: -1,
      displayOrder: 1,
      createdAt: -1,
    })
    .select(
      [
        "title",
        "slug",
        "excerpt",
        "coverImage",
        "author",
        "category",
        "tags",
        "readingTime",
        "featured",
        "publishedAt",
      ].join(" ")
    )
    .lean();

  return posts.map((post) => ({
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage
      ? {
          url: post.coverImage.url,
          publicId: post.coverImage.publicId ?? null,
          alt: post.coverImage.alt ?? post.title,
        }
      : null,
    author: post.author,
    category: post.category,
    tags: Array.isArray(post.tags) ? post.tags : [],
    readingTime: post.readingTime ?? null,
    featured: post.featured,
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString()
      : null,
  }));
}

export default async function BlogSection() {
  const posts = await getBlogPosts();

  if (posts.length === 0) {
    return null;
  }

  const featuredPost =
    posts.find((post) => post.featured) ?? posts[0];

  const supportingPosts = posts.filter(
    (post) => post.id !== featuredPost.id
  );

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="relative w-full max-w-full scroll-mt-28 overflow-x-clip border-t border-[#1A1A1A] bg-[#080808] py-24 sm:py-28 lg:py-32"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[420px] w-[420px] rounded-full bg-[#FFC400]/[0.02] blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-7xl min-w-0 px-5 sm:px-8 lg:px-10">
        {/* INTRO */}
        <div className="mx-auto max-w-3xl text-center">
          <BlogIntro />
        </div>

        {/* FEATURED ARTICLE */}
        <div className="mx-auto mt-14 w-full min-w-0 max-w-6xl">
          <BlogCard
            post={featuredPost}
            featured
          />
        </div>

        {/* SUPPORTING ARTICLES */}
        {supportingPosts.length > 0 && (
          <div className="mx-auto mt-5 grid w-full min-w-0 max-w-6xl gap-5 md:grid-cols-2">
            {supportingPosts
              .slice(0, 4)
              .map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                />
              ))}
          </div>
        )}
      </div>
    </section>
  );
}