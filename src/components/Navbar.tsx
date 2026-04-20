import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SERVICES, BUSINESS } from '../constants';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  const close = () => setIsMenuOpen(false);

  const navLink =
    'text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-construction-yellow transition-colors';
  const activeNavLink = 'text-construction-yellow';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-black text-white h-[70px] flex items-center border-b-4 border-construction-yellow">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex justify-between items-center">

        {/* Logo */}
        <Link to="/" onClick={close}>
          <img
            src="/images/logo/logo.png"
            alt="B. Edwards Construction"
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${navLink} ${isActive ? activeNavLink : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${navLink} ${isActive ? activeNavLink : ''}`}
          >
            About
          </NavLink>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `flex items-center gap-1 ${navLink} ${isActive ? activeNavLink : ''}`
              }
            >
              Services <ChevronDown className="w-3 h-3" />
            </NavLink>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white text-deep-black shadow-xl py-2"
                >
                  {SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services#${s.slug}`}
                      className="block px-4 py-2 text-[11px] font-bold uppercase tracking-wide hover:bg-construction-yellow hover:text-deep-black transition-colors"
                      onClick={() => setIsServicesOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/gallery"
            className={({ isActive }) => `${navLink} ${isActive ? activeNavLink : ''}`}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => `${navLink} ${isActive ? activeNavLink : ''}`}
          >
            Blog
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${navLink} ${isActive ? activeNavLink : ''}`}
          >
            Contact
          </NavLink>

          {/* Phone */}
          <a
            href={BUSINESS.phoneHref}
            className="ml-4 flex items-center gap-2 bg-construction-yellow text-deep-black px-4 py-2 font-black text-sm uppercase tracking-wide hover:bg-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS.phone}
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="fixed inset-0 top-[70px] bg-deep-black z-40 flex flex-col p-8 gap-6"
          >
            <nav className="flex flex-col gap-5">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/services', label: 'Services' },
                { to: '/gallery', label: 'Gallery' },
                { to: '/blog', label: 'Blog' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={close}
                  className={({ isActive }) =>
                    `text-2xl font-black uppercase tracking-tight ${
                      isActive ? 'text-construction-yellow' : 'text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-white/10 pt-6">
              <a
                href={BUSINESS.phoneHref}
                className="flex items-center gap-2 text-xl font-black text-construction-yellow"
              >
                <Phone className="w-5 h-5" /> {BUSINESS.phone}
              </a>
              <p className="text-white/50 text-sm mt-2">{BUSINESS.address}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
