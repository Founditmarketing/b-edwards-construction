import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Award, Wrench, Clock } from 'lucide-react';
import { BUSINESS } from '../constants';
import SEO from '../components/SEO';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Local & Trusted',
    body: 'We are a dedicated Louisiana business serving our community with pride. Every project we take on is a reflection of our reputation.',
  },
  {
    icon: Award,
    title: 'Quality First',
    body: 'From materials to methods, we never cut corners. Our craftsmanship is built to outlast trends, seasons, and decades.',
  },
  {
    icon: Wrench,
    title: 'Full-Service Build',
    body: 'We handle every phase — from site prep and foundation to framing, roofing, and final finish. One team, one vision.',
  },
  {
    icon: Clock,
    title: 'On Time. Every Time.',
    body: 'We respect your timeline and your budget. Clear communication and reliable execution is how we do business.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about B. Edwards Construction, a trusted Louisiana local business with over 10 years of experience delivering quality metal buildings and concrete work."
        path="/about"
        image="/images/about/about-concrete.jpg"
      />
      {/* Page Hero */}
      <div className="page-hero">
        <img src="/images/about/about-concrete.jpg" alt="B. Edwards Construction" className="page-hero-img" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        <div className="page-hero-content">
          <span className="section-label">Who We Are</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white leading-tight">About B. Edwards</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Text column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">Our Story</span>
              <h2 className="section-heading mb-4">Built from the<br />Ground Up</h2>
              <div className="accent-line" />

              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Welcome to B. Edwards Construction — your number one choice for construction services in Louisiana. As a dedicated local business, we take pride in delivering professional, affordable solutions to our community.
                </p>
                <p>
                  Our experienced team is committed to bringing your vision to life. Whether you need a resilient metal structure, a sturdy foundation, a durable metal roof, or custom welding and fabrication work, we offer comprehensive services with a focus on quality craftsmanship.
                </p>
                <p>
                  From concept to completion, we handle every detail — so you can focus on what matters most. Trust B. Edwards Construction for all your construction needs, big or small.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary">Get a Free Estimate</Link>
                <a href={BUSINESS.phoneHref} className="btn-outline-dark">{BUSINESS.phone}</a>
              </div>
            </motion.div>

            {/* Image column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="/images/gallery/gallery-26.jpg"
                alt="Large metal building project"
                className="w-full h-64 object-cover shadow-md"
              />
              <img
                src="/images/gallery/gallery-08.jpg"
                alt="Concrete foundation work"
                className="w-full h-64 object-cover shadow-md mt-10"
              />
              <img
                src="/images/gallery/gallery-09.jpg"
                alt="Barn construction"
                className="w-full h-48 object-cover shadow-md col-span-2"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-off-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-heading">The B. Edwards Difference</h2>
            <div className="accent-line mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-construction-yellow flex items-center justify-center mb-5">
                  <v.icon className="w-6 h-6 text-deep-black" />
                </div>
                <h3 className="text-base font-black uppercase mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-deep-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10+', label: 'Years in Business' },
              { number: '200+', label: 'Projects Completed' },
              { number: '7', label: 'Service Categories' },
              { number: '100%', label: 'Louisiana Proud' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl md:text-5xl font-black text-construction-yellow mb-2">{stat.number}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <span className="section-label">Ready to Start?</span>
          <h2 className="section-heading mb-6">Let's Build Something<br />Together</h2>
          <Link to="/contact" className="btn-primary">Contact Us Today</Link>
        </div>
      </section>
    </>
  );
}
