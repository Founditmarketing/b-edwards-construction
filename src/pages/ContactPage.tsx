import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Mail } from 'lucide-react';
import { BUSINESS } from '../constants';
import SEO from '../components/SEO';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading' || status === 'success') return;
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      access_key: (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
      subject: 'New Estimate Request from Website',
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email') || 'Not provided',
      message: formData.get('message'),
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Free Estimates"
        description="Ready to start your next construction project in Louisiana? Contact B. Edwards Construction today for a free, no-obligation estimate."
        path="/contact"
        image="/images/gallery/gallery-14.jpg"
      />
      {/* Page Hero */}
      <div className="page-hero">
        <img src="/images/gallery/gallery-14.jpg" alt="Contact B. Edwards Construction" className="page-hero-img" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        <div className="page-hero-content">
          <span className="section-label">Free Estimates</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white">Get In Touch</h1>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="section-label">Contact Us</span>
              <h2 className="section-heading mb-4">Let's Build Something<br />Together</h2>
              <div className="accent-line" />
              <p className="text-gray-600 leading-relaxed mb-10">
                Whether you have a clear plan or you're still in the idea stage, we'd love to talk. Reach out and we'll get back to you with a free, no-obligation estimate.
              </p>

              <div className="space-y-6">
                <a
                  href={BUSINESS.phoneHref}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-construction-yellow flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-deep-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Phone</p>
                    <p className="font-bold text-lg group-hover:text-construction-yellow transition-colors">{BUSINESS.phone}</p>
                  </div>
                </a>

                <a
                  href={BUSINESS.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-off-white flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-deep-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Address</p>
                    <p className="font-bold group-hover:text-construction-yellow transition-colors">{BUSINESS.address}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-off-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-deep-black" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
                    <p className="font-bold group-hover:text-construction-yellow transition-colors">{BUSINESS.email}</p>
                  </div>
                </a>
              </div>

              {/* Google Review CTA */}
              <div className="mt-12 p-6 bg-off-white">
                <p className="text-sm font-bold mb-3">Happy with our work? Leave us a review:</p>
                <a
                  href={BUSINESS.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark text-xs"
                >
                  Review Us on Google
                </a>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-off-white p-10"
            >
              <h3 className="text-2xl font-black uppercase mb-1">Request a Free Estimate</h3>
              <p className="text-sm text-gray-500 mb-8">Fill out the form below and we'll be in touch shortly.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5 text-gray-500" htmlFor="name">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5 text-gray-500" htmlFor="phone">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(318) 000-0000"
                      className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5 text-gray-500" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1.5 text-gray-500" htmlFor="message">
                    Project Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell us about your project — size, type, location, timeline..."
                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error — Try Again' : 'Send Request'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
