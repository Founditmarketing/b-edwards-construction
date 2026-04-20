import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { SERVICES } from '../constants';
import SEO, { serviceSchema } from '../components/SEO';

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Construction Services"
        description="From metal buildings and concrete foundations to custom shops and roofing. Explore B. Edwards Construction's full range of competitive services."
        path="/services"
        image="/images/services/metal-buildings.jpg"
        schemas={SERVICES.map(s => serviceSchema(s))}
      />
      {/* Page Hero */}
      <div className="page-hero">
        <img src="/images/services/metal-buildings.jpg" alt="B. Edwards Construction services" className="page-hero-img" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        <div className="page-hero-content">
          <span className="section-label">What We Build</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white">Our Services</h1>
        </div>
      </div>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="section-label">Big or Small, We Build Them All</span>
          <h2 className="section-heading mb-4">Quality is What We Do</h2>
          <div className="accent-line mx-auto" />
          <p className="max-w-2xl mx-auto text-gray-500 leading-relaxed">
            From metal buildings and concrete foundations to barns, camps, and patios — B. Edwards Construction delivers quality craftsmanship across every category. Contact us to discuss your project.
          </p>
        </div>
      </section>

      {/* Service Detail Sections */}
      {SERVICES.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-24 ${i % 2 === 0 ? 'bg-off-white' : 'bg-white'}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
                className={i % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <img
                  src={service.img}
                  alt={service.name}
                  className="w-full h-80 object-cover shadow-lg"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className={i % 2 !== 0 ? 'lg:order-1' : ''}
              >
                <span className="section-label">{service.tagline}</span>
                <h2 className="section-heading mb-4">{service.name}</h2>
                <div className="accent-line" />
                <p className="text-gray-600 leading-relaxed mb-8">{service.description}</p>
                <Link to="/contact" className="btn-primary text-sm">
                  Get a Free Estimate <ChevronRight className="ml-1 w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="/images/gallery/gallery-29.jpg"
          alt="B. Edwards project"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <span className="section-label text-construction-yellow">Ready to Begin?</span>
          <h2 className="section-heading text-white mb-6">Let's Discuss Your Project</h2>
          <Link to="/contact" className="btn-primary">Contact Us Today</Link>
        </div>
      </section>
    </>
  );
}
