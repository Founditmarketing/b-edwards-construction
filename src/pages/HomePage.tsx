import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronLeft, ChevronRight, ShieldCheck, Award, Wrench } from 'lucide-react';
import { SERVICES, HERO_GALLERY, BLOG_POSTS, BUSINESS } from '../constants';

export default function HomePage() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const isPaused = useRef(false);

  // Auto-advance gallery every 4 s, pause on hover
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current) {
        setGalleryIndex(p => (p === HERO_GALLERY.length - 1 ? 0 : p + 1));
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const catchphrase = 'Built from the ground up, Built for Louisiana.';
  const words = catchphrase.split(' ');

  const charVariants = {
    hidden: (i: number) => {
      const dirs = [{ x: -400, y: 0 }, { x: 400, y: 0 }, { x: 0, y: -300 }, { x: 0, y: 300 }];
      return { ...dirs[i % 4], opacity: 0, scale: 2, rotate: (i % 5) * 12 - 24 };
    },
    visible: (i: number) => ({
      x: 0, y: 0, opacity: 1, scale: 1, rotate: 0,
      transition: {
        type: 'spring' as const, stiffness: 100, damping: 14,
        delay: (Math.abs(Math.sin(i * 987.654)) % 1) * 1.4,
      },
    }),
  };

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/hero-carport.jpg"
            alt="B. Edwards Construction project"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-[70px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-label text-construction-yellow mb-6"
          >
            Louisiana's Premier Builders
          </motion.p>

          <div className="flex flex-wrap gap-x-5 gap-y-1 mb-10 max-w-5xl">
            {words.map((word, wi) => (
              <div key={wi} className="flex">
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    custom={wi * 10 + ci}
                    variants={charVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl sm:text-7xl md:text-8xl font-black uppercase inline-block leading-[0.9] text-white"
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            <Link to="/gallery" className="btn-outline-white">View Our Work</Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/40 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* ── TRUST BAR ──────────────────────────────────────────── */}
      <div className="bg-construction-yellow text-deep-black py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around items-center gap-4 text-[10px] font-black uppercase tracking-widest">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Local Louisiana Business</span>
          <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5" /> Quality Craftsmanship</span>
          <span className="flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" /> Metal Specialists</span>
          <span className="flex items-center gap-1.5">Free Estimates</span>
        </div>
      </div>

      {/* ── ABOUT PREVIEW ──────────────────────────────────────── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-label">About B. Edwards Construction</span>
              <h2 className="section-heading mb-4">Built for<br />Louisiana.</h2>
              <div className="accent-line" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to B. Edwards Construction — your number one choice for construction services in Louisiana. As a dedicated local business, we take pride in delivering professional, affordable solutions to our community.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you need a resilient metal structure, a sturdy foundation, a durable roof, or a custom shop, we bring quality craftsmanship to every project — from concept to completion.
              </p>
              <Link to="/about" className="btn-outline-dark text-sm">
                Our Story
              </Link>
            </motion.div>

            {/* Images — staggered offset */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/images/about/about-concrete.jpg"
                alt="Concrete foundation work"
                className="w-full h-72 object-cover shadow-md"
              />
              <img
                src="/images/gallery/gallery-10.jpg"
                alt="Metal building project"
                className="w-full h-72 object-cover shadow-md mt-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ──────────────────────────────────────── */}
      <section id="services" className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label">What We Build</span>
            <h2 className="section-heading">Our Services</h2>
            <div className="accent-line mx-auto" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {SERVICES.slice(0, 4).map((s, i) => (
              <ServiceCard key={s.slug} service={s} i={i} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICES.slice(4).map((s, i) => (
              <ServiceCard key={s.slug} service={s} i={i + 4} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-outline-dark text-sm">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY CAROUSEL ───────────────────────────────────── */}
      <section id="gallery" className="py-24 bg-deep-black text-white">
        <div
          className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center"
        >
          <div>
            <span className="section-label">Project Showcase</span>
            <h2 className="section-heading text-white">Our Work</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setGalleryIndex(p => (p === 0 ? HERO_GALLERY.length - 1 : p - 1))}
              className="w-11 h-11 flex items-center justify-center border border-white/30 hover:bg-white hover:text-deep-black transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setGalleryIndex(p => (p === HERO_GALLERY.length - 1 ? 0 : p + 1))}
              className="w-11 h-11 flex items-center justify-center border border-white/30 hover:bg-white hover:text-deep-black transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          className="relative h-[520px] w-full overflow-hidden"
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={galleryIndex}
              src={HERO_GALLERY[galleryIndex]}
              alt={`B. Edwards Construction project ${galleryIndex + 1}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-6 flex justify-between items-center">
          <div className="flex gap-1.5">
            {HERO_GALLERY.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setGalleryIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex ? 'bg-construction-yellow scale-125' : 'bg-white/30'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <Link to="/gallery" className="text-xs font-black uppercase tracking-widest text-white/60 hover:text-construction-yellow transition-colors flex items-center gap-1">
            Full Gallery <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </section>

      {/* ── BLOG PREVIEW ───────────────────────────────────────── */}
      <section id="blog" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="section-label">From the Field</span>
              <h2 className="section-heading">Build Knowledge</h2>
              <div className="accent-line" />
            </div>
            <Link to="/blog" className="text-xs font-black uppercase tracking-widest underline underline-offset-4 hover:text-construction-yellow transition-colors whitespace-nowrap">
              All Posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-construction-yellow mb-2">
                    {post.tag} · {post.date}
                  </span>
                  <h3 className="text-lg font-black leading-snug mb-3 group-hover:text-construction-yellow transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-5 text-[10px] font-black uppercase tracking-widest self-start border-b border-deep-black pb-0.5 hover:border-construction-yellow hover:text-construction-yellow transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="/images/gallery/gallery-05.jpg"
          alt="Construction project"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <span className="section-label text-construction-yellow">Ready to Build?</span>
          <h2 className="section-heading text-white mb-6">Let's Start Your Project</h2>
          <p className="text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            From the first call to the final nail — B. Edwards Construction handles it all. Contact us today for a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Get a Free Estimate</Link>
            <a href={BUSINESS.phoneHref} className="btn-outline-white">{BUSINESS.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service, i }: { service: typeof SERVICES[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="group relative overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={service.img}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="bg-white px-4 py-3 border-t-2 border-construction-yellow">
        <h3 className="text-xs font-black uppercase tracking-wider">{service.name}</h3>
      </div>
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-deep-black/85 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-sm font-black uppercase text-construction-yellow mb-1">{service.name}</h3>
        <p className="text-white/70 text-xs leading-relaxed line-clamp-3">{service.description}</p>
        <Link
          to={`/services#${service.slug}`}
          className="mt-3 text-[10px] font-black uppercase tracking-widest text-construction-yellow hover:text-white transition-colors"
        >
          Learn More →
        </Link>
      </div>
    </motion.div>
  );
}
