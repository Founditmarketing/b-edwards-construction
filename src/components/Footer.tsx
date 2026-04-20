import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';
import { SERVICES, BUSINESS } from '../constants';

export default function Footer() {
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
    <footer id="contact" className="bg-deep-black text-white">
      {/* Yellow accent top border */}
      <div className="h-1 bg-construction-yellow" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div className="lg:col-span-1">
          <Link to="/">
            <img
              src="/images/logo/logo.png"
              alt="B. Edwards Construction"
              className="h-14 w-auto object-contain brightness-0 invert mb-6"
            />
          </Link>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Louisiana's premier builder for metal buildings, concrete foundations, roofs, shops, camps, barns, and patios.
          </p>
          <div className="space-y-3">
            <a
              href={BUSINESS.phoneHref}
              className="flex items-center gap-3 text-construction-yellow font-bold hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              {BUSINESS.phone}
            </a>
            <a
              href={BUSINESS.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-white/60 text-sm hover:text-white transition-colors"
            >
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {BUSINESS.address}
            </a>
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-construction-yellow mb-6">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/services', label: 'Services' },
              { to: '/gallery', label: 'Gallery' },
              { to: '/blog', label: 'Blog' },
              { to: '/contact', label: 'Contact Us' },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="text-white/60 text-sm hover:text-construction-yellow transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-construction-yellow mb-6">
            Our Services
          </h4>
          <ul className="space-y-3">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services#${s.slug}`}
                  className="text-white/60 text-sm hover:text-construction-yellow transition-colors"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Contact Form */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-construction-yellow mb-6">
            Free Estimate
          </h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors"
            />
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone number"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors"
            />
            <textarea
              name="message"
              rows={3}
              required
              placeholder="Describe your project..."
              className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-construction-yellow transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-construction-yellow text-deep-black font-black uppercase tracking-wider py-3 text-sm hover:bg-white transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent!' : status === 'error' ? 'Error — Try Again' : 'Send Request'}
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.</span>
          <a
            href={BUSINESS.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-construction-yellow transition-colors"
          >
            Leave Us a Google Review
          </a>
        </div>
      </div>
    </footer>
  );
}
