import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog | Bright Box Homes',
  description:
    'Guides on expandable container homes - finding unrestricted land, true costs, legality and permits, off-grid setups, and how prefab compares to traditional construction.',
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #0F1729, #141B2D)' }}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#6B9BF7]">
            The Bright Box Blog
          </p>
          <h1 className="font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl lg:text-6xl">
            Guides for Smarter Prefab Buyers
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#D1D5DB]">
            Honest, in-depth guides on land, cost, permits, and off-grid living - so you
            can plan your Bright Box Home with confidence.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="bg-[#F5F0E8] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow duration-normal ease-out hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)]"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#3461C7]">
                    {post.category}
                  </p>
                  <h2 className="mt-2 font-heading text-xl font-semibold text-[#111827]">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#4B5563]">
                    {post.date} &middot; {post.readingTime}
                  </p>
                  <p className="mt-3 flex-1 text-sm text-[#4B5563]">{post.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#4A7CE5] group-hover:underline">
                    Read more <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
