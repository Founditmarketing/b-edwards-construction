import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { BLOG_POSTS, BUSINESS } from '../constants';
import SEO, { articleSchema, breadcrumbSchema } from '../components/SEO';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);

  if (postIndex === -1) return <Navigate to="/blog" replace />;

  const post = BLOG_POSTS[postIndex];
  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.img}
        type="article"
        schemas={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.img} alt={post.title} className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-10 pt-[70px]">
          <Link to="/blog" className="inline-flex items-center gap-1 text-white/50 text-xs font-bold uppercase tracking-widest mb-4 hover:text-construction-yellow transition-colors">
            <ChevronLeft className="w-3 h-3" /> Back to Blog
          </Link>
          <span className="text-construction-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-2">
            {post.tag} · {post.date}
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Article body */}
      <article className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {post.body.map((block, i) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={i} className="text-2xl font-black uppercase mt-12 mb-4 text-deep-black">
                    {block.content}
                  </h2>
                );
              }
              return (
                <p key={i} className="text-gray-600 leading-[1.85] mb-5 text-[15px]">
                  {block.content}
                </p>
              );
            })}
          </motion.div>

          {/* CTA */}
          <div className="mt-16 bg-off-white p-8 md:p-12 text-center">
            <span className="section-label">Ready to Build?</span>
            <h3 className="text-2xl md:text-3xl font-black uppercase mb-3">Let's Start Your Project</h3>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              Contact B. Edwards Construction today for a free, no-obligation estimate on your next build.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-sm">Get a Free Estimate</Link>
              <a href={BUSINESS.phoneHref} className="btn-outline-dark text-sm">
                <Phone className="w-4 h-4 mr-2" /> {BUSINESS.phone}
              </a>
            </div>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="group p-6 bg-off-white hover:bg-construction-yellow transition-colors"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-deep-black/60 mb-2 block">
                  ← Previous
                </span>
                <span className="font-bold text-sm leading-snug group-hover:text-deep-black">{prevPost.title}</span>
              </Link>
            ) : <div />}
            {nextPost ? (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="group p-6 bg-off-white hover:bg-construction-yellow transition-colors text-right"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-deep-black/60 mb-2 block">
                  Next →
                </span>
                <span className="font-bold text-sm leading-snug group-hover:text-deep-black">{nextPost.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>
    </>
  );
}
