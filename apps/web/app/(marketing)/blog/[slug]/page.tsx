import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getPostBySlug } from '@/lib/blog-data';
import { BookConsultation } from '@/components/ui/BookConsultation';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found | Bright Box Homes' };
  return {
    title: `${post.title} | Bright Box Homes`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article className="bg-[#0F1729] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#6B9BF7] transition-colors duration-fast ease-out hover:text-[#FFFFFF]"
          >
            <ArrowLeft size={16} aria-hidden="true" /> All posts
          </Link>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-[#6B9BF7]">
            {post.category}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-[#FFFFFF] md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-[#9CA3AF]">
            By the Bright Box Homes Team &middot; {post.readingTime}
          </p>
          <p className="mt-1 text-sm text-[#9CA3AF]">{post.date} &middot; Updated June 2026</p>

          <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.06]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(min-width: 768px) 48rem, 100vw"
              className="object-cover"
            />
          </div>

          <div className="mt-10 space-y-6">
            {post.content.map((block, i) =>
              block.type === 'heading' ? (
                <h2
                  key={i}
                  className="font-heading text-2xl font-bold text-[#FFFFFF]"
                >
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="text-lg leading-relaxed text-[#D1D5DB]">
                  {block.text}
                </p>
              ),
            )}
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="bg-[#F5F0E8] py-16 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 text-center">
          <h2 className="font-heading text-3xl font-bold text-[#111827] md:text-4xl">
            Ready to plan your Bright Box Home?
          </h2>
          <p className="mt-4 text-lg text-[#4B5563]">
            Talk to our team about models, site requirements, and your budget.
          </p>
          <div className="mt-8 flex justify-center">
            <BookConsultation size="lg" />
          </div>
          <p className="mt-6 text-sm text-[#4B5563]">
            800-259-1745 &middot; info@brightboxhomes.com
          </p>
        </div>
      </section>
    </>
  );
}
