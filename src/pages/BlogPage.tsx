import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';

export default function BlogPage() {
  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <img src="/images/gallery/gallery-08.jpg" alt="B. Edwards blog" className="page-hero-img" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        <div className="page-hero-content">
          <span className="section-label">From the Field</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white">Build Knowledge</h1>
        </div>
      </div>

      {/* Posts */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label">Latest Articles</span>
            <h2 className="section-heading">Construction Insights</h2>
            <div className="accent-line mx-auto" />
            <p className="text-gray-500 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              Tips, guides, and insights from the B. Edwards Construction team — helping you make smart decisions about your next build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-60 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-construction-yellow mb-3">
                    {post.tag} · {post.date}
                  </span>
                  <h2 className="text-xl font-black leading-snug mb-4 group-hover:text-construction-yellow transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                  <Link
                    to="/contact"
                    className="mt-6 text-[10px] font-black uppercase tracking-widest self-start border-b border-deep-black pb-0.5 hover:border-construction-yellow hover:text-construction-yellow transition-colors"
                  >
                    Start Your Project →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center bg-off-white p-12">
            <span className="section-label">Stay Connected</span>
            <h3 className="section-heading mb-4">Have a Project in Mind?</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              We'd love to hear about what you're planning. Reach out for a free estimate — no pressure, no obligation.
            </p>
            <Link to="/contact" className="btn-primary">Get a Free Estimate</Link>
          </div>
        </div>
      </section>
    </>
  );
}
