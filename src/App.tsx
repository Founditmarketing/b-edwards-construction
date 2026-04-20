/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft,
  MapPin,
  Award,
  ShieldCheck
} from 'lucide-react';

const SERVICES = [
  { name: 'Metal Buildings',      img: '/images/services/metal-buildings.jpg' },
  { name: 'Concrete Foundations', img: '/images/services/concrete-foundations.jpg' },
  { name: 'Roofs',                img: '/images/services/roofs.jpg' },
  { name: 'Shops',                img: '/images/services/shops.jpg' },
  { name: 'Camps',                img: '/images/services/camps.jpg' },
  { name: 'Barns',                img: '/images/services/barns.jpg' },
  { name: 'Patios',               img: '/images/services/patios.jpg' },
];

const SERVICE_DESCRIPTIONS: Record<string, string> = {
  'Metal Buildings': 'B. Edwards Construction is a local leader in resilient metal buildings in Louisiana. These structures provide reliable, long-lasting protection against weather and structural wear.',
  'Concrete Foundations': 'Our foundations offer resistance to environmental elements, ensuring longevity and minimal maintenance. High-quality materials and professional craftsmanship create a solid, secure base.',
  'Roofs': 'A well-constructed roof safeguards your property against unpredictable elements while contributing to energy efficiency and long-term value.',
  'Shops': 'Quality shop construction provides a secure, functional, and durable workspace. Reduced maintenance costs and enhanced energy efficiency make it a smart long-term investment.',
  'Camps': 'We build safe, resilient, and functional camp environments tailored to diverse needs. Quality construction ensures the comfort and security of occupants.',
  'Barns': 'Our builders ensure every barn meets industry standards for structural integrity and longevity — creating reliable, efficient spaces for agricultural and storage needs.',
  'Patios': 'A well-constructed patio enhances curb appeal and structural stability. We address challenges like drainage and soil conditions for a reliable outdoor space.',
};

const GALLERY = [
  '/images/gallery/gallery-26.jpg',
  '/images/gallery/gallery-05.jpg',
  '/images/gallery/gallery-08.jpg',
  '/images/gallery/gallery-29.jpg',
  '/images/gallery/gallery-14.jpg',
  '/images/gallery/gallery-01.jpg',
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Hero Construction Animation Variants
  const charVariants = {
    hidden: (index: number) => {
      const directions = [
        { x: -600, y: 0 }, 
        { x: 600, y: 0 }, 
        { x: 0, y: -600 }, 
        { x: 0, y: 600 },
      ];
      return {
        ...directions[index % 4],
        opacity: 0,
        scale: 3,
        rotate: (index % 5) * 15 - 30, // More varied rotation
      };
    },
    visible: (index: number) => {
      // Use a deterministic pseudo-random offset based on the character's global position
      const randomSeed = Math.abs(Math.sin(index * 987.654)) % 1;
      return {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: {
          type: 'spring',
          stiffness: 110, // Snappier
          damping: 15,
          duration: 0.8,
          delay: randomSeed * 1.5, // Total construction time ~1.5s but completely randomized
        },
      };
    },
  };

  const catchphrase = "Built from the ground up, Built for Louisiana.";
  const words = catchphrase.split(" ");

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header & Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-black text-white border-b-[6px] border-construction-yellow h-[70px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/images/logo/logo.png"
                alt="B. Edwards Construction"
                className="h-12 w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-10 h-full">
              <div className="flex space-x-6 font-sans font-bold uppercase tracking-widest text-[11px]">
                <a href="#home" className="hover:text-construction-yellow transition-colors">Home</a>
                <a href="#about" className="hover:text-construction-yellow transition-colors">About Us</a>
                
                {/* Dropdown Services */}
                <div className="relative group" 
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button className="flex items-center text-construction-yellow hover:text-white transition-colors uppercase">
                    Services <ChevronDown className="ml-1 w-3 h-3" />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 w-64 bg-white text-deep-black border-4 border-deep-black p-4 space-y-3 sturdy-shadow"
                      >
                        {SERVICES.map((s) => (
                          <a key={s.name} href={`#service-${s.name.toLowerCase().replace(' ', '-')}`} className="block hover:bg-construction-yellow transition-all p-2 font-black text-[10px] border border-transparent hover:border-deep-black">{s.name}</a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="#gallery" className="hover:text-construction-yellow transition-colors">Gallery</a>
                <a href="#blog" className="hover:text-construction-yellow transition-colors">Blog</a>
                <a href="#contact" className="hover:text-construction-yellow transition-colors">Contact</a>
              </div>

              {/* Right Side Info */}
              <div className="flex flex-col text-right h-full">
                <span className="text-construction-yellow text-[10px] font-black tracking-widest">CALL US TODAY</span>
                <a href="tel:3184817588" className="font-sans font-black text-lg hover:text-construction-yellow transition-colors leading-none">
                  (318) 481-7588
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 bg-construction-yellow border-2 border-deep-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-0 top-24 bg-white z-40 p-8 flex flex-col space-y-8"
            >
              <nav className="flex flex-col space-y-6 font-display font-black text-2xl uppercase italic">
                <a onClick={() => setIsMenuOpen(false)} href="#home">Home</a>
                <a onClick={() => setIsMenuOpen(false)} href="#about">About</a>
                <a onClick={() => setIsMenuOpen(false)} href="#services">Services</a>
                <a onClick={() => setIsMenuOpen(false)} href="#gallery">Gallery</a>
                <a onClick={() => setIsMenuOpen(false)} href="#blog">Blog</a>
                <a onClick={() => setIsMenuOpen(false)} href="#contact">Contact</a>
              </nav>
              <div className="pt-8 border-t-4 border-deep-black space-y-4">
                <p className="font-mono text-sm uppercase">Quick Connect</p>
                <a href="tel:3184817588" className="flex items-center text-xl font-bold">(318) 481-7588</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden border-b-4 border-deep-black">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/hero-carport.jpg" 
            alt="B. Edwards Construction — metal carport build" 
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex flex-col justify-center pt-[70px]">
          <div className="text-construction-yellow font-black text-xs tracking-[0.3em] mb-4">LOUISIANA'S PREMIER BUILDERS</div>
          
          {/* Construction Animation Catchphrase */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 max-w-4xl">
            {words.map((word, wordIdx) => (
              <div key={wordIdx} className="flex overflow-hidden">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    custom={wordIdx * 10 + charIdx}
                    variants={charVariants}
                    initial="hidden"
                    animate="visible"
                    className={`text-6xl md:text-8xl font-black uppercase inline-block leading-[0.9] ${word.toUpperCase() === 'UP.' ? 'text-construction-yellow' : 'text-white'}`}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <a href="#contact" className="bg-construction-yellow text-deep-black px-8 py-5 font-black text-lg uppercase border-4 border-deep-black hover:bg-white transition-all transform hover:-translate-y-1 sturdy-border text-center">
              Get a Free Quote
            </a>
            <a href="#gallery" className="bg-white text-deep-black px-8 py-5 font-black text-lg uppercase border-4 border-deep-black hover:bg-construction-yellow transition-all transform hover:-translate-y-1 sturdy-border text-center">
              View Our Work
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] font-black uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* 3. Trust Bar */}
      <div className="bg-construction-yellow text-deep-black border-b-4 border-deep-black h-[40px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex justify-around items-center font-black uppercase text-[11px] tracking-widest whitespace-nowrap overflow-hidden">
            <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1" /> Local Louisiana Business</span>
            <span className="hidden sm:inline flex items-center border-l-2 border-deep-black pl-8"><Award className="w-3 h-3 mr-1" /> Professional Team</span>
            <span className="hidden lg:inline flex items-center border-l-2 border-deep-black pl-8">Quality Craftsmanship</span>
            <span className="hidden xl:inline flex items-center border-l-2 border-deep-black pl-8">Metal Specialists</span>
          </div>
        </div>
      </div>

      {/* 4. About Us Section */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-0 border-4 border-deep-black min-h-[400px]">
          <div className="p-12 space-y-8 bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-deep-black">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-2 border-b-8 border-construction-yellow inline-block leading-tight">About<br />B. Edwards</h2>
            <div className="space-y-6 text-sm font-medium leading-relaxed text-steel-gray">
              <p>
                Welcome to B. Edwards Construction, your number one choice for construction services in Louisiana. 
                As a dedicated local business, we take pride in delivering professional, affordable solutions to 
                our community. Our experienced team is committed to bringing your vision to life.
              </p>
              <p>
                Whether you're in need of a resilient metal structure, a sturdy foundation, a durable metal roof, 
                or custom welding and fabrication work, we offer comprehensive services with a focus on quality 
                craftsmanship. From concept to completion, trust B. Edwards Construction for all your construction needs.
              </p>
            </div>
            <a href="#services" className="text-xs font-black uppercase underline hover:text-construction-yellow transition-colors underline-offset-4">
              See Our Services
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-0">
             <div className="relative h-full min-h-[200px] border-b-4 lg:border-b-4 border-deep-black">
                <img 
                  src="/images/about/about-concrete.jpg" 
                  alt="B. Edwards Construction — concrete foundation work" 
                  className="w-full h-full object-cover"
                />
             </div>
             <div className="relative h-full min-h-[200px]">
                <img 
                  src="/images/gallery/gallery-10.jpg" 
                  alt="B. Edwards Construction — metal building project" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </div>
      </section>

      <div className="block-divider"></div>

      {/* 5. Services Section */}
      <section id="services" className="py-20 bg-[#f0f0f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-1">Our Services</h2>
            <div className="w-24 h-2 bg-construction-yellow mx-auto border border-deep-black"></div>
          </div>

          <div className="space-y-4">
            {/* Top Row: 4 Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.slice(0, 4).map((s, i) => (
                <ServiceCard key={s.name} service={s} i={i} />
              ))}
            </div>
            {/* Bottom Row: 3 Cards Centered */}
            <div className="flex justify-center gap-4 flex-wrap">
              {SERVICES.slice(4).map((s, i) => (
                <div key={s.name} className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1rem)]">
                  <ServiceCard service={s} i={i + 4} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section id="blog" className="py-24 bg-white border-t-4 border-deep-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="text-construction-yellow font-black text-xs tracking-[0.3em] mb-2">FROM THE FIELD</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">Build Knowledge</h2>
            </div>
            <a href="#contact" className="text-xs font-black uppercase underline underline-offset-4 hover:text-construction-yellow transition-colors whitespace-nowrap">
              Get a Free Estimate →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: '/images/gallery/gallery-26.jpg',
                tag: 'Metal Buildings',
                title: 'Why Metal Buildings Are the Smart Choice in Louisiana',
                excerpt: 'From humidity to hurricanes, Louisiana\'s climate demands structures built to last. Here\'s why metal is the material of choice for builders across the state.',
                date: 'March 2025',
              },
              {
                img: '/images/gallery/gallery-08.jpg',
                tag: 'Foundations',
                title: 'What You Need to Know Before Pouring a Concrete Foundation',
                excerpt: 'Soil conditions matter more than most people think. We break down the key decisions that determine whether your foundation holds up for decades.',
                date: 'February 2025',
              },
              {
                img: '/images/gallery/gallery-09.jpg',
                tag: 'Barns & Shops',
                title: 'Building a Shop or Barn: What to Plan for Before You Start',
                excerpt: 'Site preparation, permits, utilities — the decisions you make before the first post goes in the ground are the ones that determine the final result.',
                date: 'January 2025',
              },
            ].map((post, i) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border-2 border-deep-black bg-white flex flex-col"
              >
                <div className="h-52 overflow-hidden border-b-2 border-deep-black">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-construction-yellow mb-2">{post.tag} · {post.date}</span>
                  <h3 className="text-lg font-black leading-tight mb-3 group-hover:text-construction-yellow transition-colors">{post.title}</h3>
                  <p className="text-xs text-steel-gray leading-relaxed flex-1">{post.excerpt}</p>
                  <a href="#contact" className="mt-4 text-[10px] font-black uppercase tracking-widest border-b-2 border-deep-black pb-0.5 self-start hover:border-construction-yellow hover:text-construction-yellow transition-colors">
                    Contact Us →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Quote Section */}
      <section id="contact" className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-deep-black">
          {/* Left — Info */}
          <div className="p-12 bg-deep-black text-white space-y-8 border-b-4 lg:border-b-0 lg:border-r-4 border-deep-black">
            <div>
              <p className="text-construction-yellow font-black text-xs tracking-[0.3em] mb-2">FREE ESTIMATES</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight">Get In<br />Touch</h2>
            </div>
            <div className="space-y-4 text-sm font-medium text-white/80">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-construction-yellow flex-shrink-0" />
                <a href="tel:3184817588" className="text-lg font-black hover:text-construction-yellow transition-colors">(318) 481-7588</a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-construction-yellow flex-shrink-0" />
                <span>350 Red Oak Tree Dr., Jonesville, LA</span>
              </div>
            </div>
            <div>
              <p className="text-construction-yellow font-black text-xs tracking-[0.3em] mb-4">LEAVE US A REVIEW</p>
              <a 
                href="https://www.google.com/maps/place/B+Edwards+Construction/@31.5086091,-91.7334082,795m/data=!3m2!1e3!4b1!4m6!3m5!1s0x862f7ff315a7f4c9:0x60a3cc8d0ac89947!8m2!3d31.5086091!4d-91.7334082!16s%2Fg%2F11vj542s0h"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-construction-yellow text-deep-black font-black text-xs uppercase border-2 border-white hover:bg-white transition-all"
              >
                Review Us on Google
              </a>
            </div>
          </div>
          {/* Right — Form */}
          <div className="p-12 bg-white space-y-6">
            <h3 className="text-2xl font-black uppercase">Request a Free Estimate</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
                const subject = encodeURIComponent('Free Estimate Request');
                const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${message}`);
                window.location.href = `mailto:info@bedwardsconstruction.com?subject=${subject}&to=${encodeURIComponent(email)}&body=${body}`;
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1" htmlFor="contact-name">Name *</label>
                  <input id="contact-name" name="name" type="text" required placeholder="Your full name" className="w-full border-2 border-deep-black px-4 py-3 text-sm font-medium focus:outline-none focus:border-construction-yellow" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest mb-1" htmlFor="contact-phone">Phone *</label>
                  <input id="contact-phone" name="phone" type="tel" required placeholder="(318) 000-0000" className="w-full border-2 border-deep-black px-4 py-3 text-sm font-medium focus:outline-none focus:border-construction-yellow" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-1" htmlFor="contact-email">Email</label>
                <input id="contact-email" name="email" type="email" placeholder="your@email.com" className="w-full border-2 border-deep-black px-4 py-3 text-sm font-medium focus:outline-none focus:border-construction-yellow" />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-1" htmlFor="contact-message">Message *</label>
                <textarea id="contact-message" name="message" required rows={4} placeholder="Describe your project..." className="w-full border-2 border-deep-black px-4 py-3 text-sm font-medium focus:outline-none focus:border-construction-yellow resize-none" />
              </div>
              <button type="submit" className="w-full bg-construction-yellow text-deep-black py-4 font-black text-sm uppercase border-2 border-deep-black hover:bg-deep-black hover:text-construction-yellow transition-all">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 7. Gallery Carousel */}
      <section id="gallery" className="py-24 bg-deep-black text-white relative overflow-hidden">
        {/* Structural Background Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-construction-yellow/20"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-construction-yellow/10"></div>

        <div className="max-w-7xl mx-auto px-4 mb-12 flex justify-between items-center">
            <h2 className="text-5xl font-black">Our Work</h2>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveGalleryIndex(prev => prev === 0 ? GALLERY.length - 1 : prev - 1)}
                className="w-12 h-12 flex items-center justify-center border-2 border-white hover:bg-white hover:text-deep-black transition-all"
              >
                <ChevronLeft />
              </button>
              <button 
                onClick={() => setActiveGalleryIndex(prev => prev === GALLERY.length - 1 ? 0 : prev + 1)}
                className="w-12 h-12 flex items-center justify-center border-2 border-white hover:bg-white hover:text-deep-black transition-all"
              >
                <ChevronRight />
              </button>
            </div>
        </div>

        <div className="relative h-[600px] w-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeGalleryIndex}
              src={GALLERY[activeGalleryIndex]}
              alt={`B. Edwards Construction project ${activeGalleryIndex + 1}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover hover:grayscale-[0.5] transition-all"
            />
          </AnimatePresence>
          
          {/* Centered Gallery Label (Industrial) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
             <div className="bg-construction-yellow text-deep-black px-12 py-6 border-4 border-deep-black sturdy-shadow-yellow transform -rotate-2">
                <p className="font-display font-black text-4xl uppercase">Featured Project</p>
                <p className="font-mono text-center text-xs mt-1">Louisiana, United States</p>
             </div>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="max-w-7xl mx-auto px-4 mt-6 flex justify-center gap-2">
          {GALLERY.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGalleryIndex(idx)}
              className={`w-2 h-2 rounded-full border border-white transition-all ${
                idx === activeGalleryIndex ? 'bg-construction-yellow border-construction-yellow scale-125' : 'bg-white/30'
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-6 flex justify-center">
           <a href="#contact" className="group flex items-center font-display font-black uppercase text-xl hover:text-construction-yellow transition-colors">
              Get a Free Quote <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
           </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-steel-gray text-white border-t-4 border-construction-yellow">
        <div className="max-w-7xl mx-auto px-4 py-4 w-full flex flex-col md:flex-row justify-between items-center text-[10px] sm:text-[11px] font-black uppercase tracking-widest gap-2">
          <div className="flex flex-wrap gap-4 items-center">
            <span>© {new Date().getFullYear()} B. Edwards Construction</span>
            <span className="hidden lg:inline text-construction-yellow">|</span>
            <a
              href="https://www.google.com/maps/place/B+Edwards+Construction/@31.5086091,-91.7334082,795m"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline hover:text-construction-yellow flex items-center gap-1"
            >
              350 Red Oak Tree Dr., Jonesville, LA
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a href="tel:3184817588" className="hover:text-construction-yellow">(318) 481-7588</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

function ServiceCard({ service, i }: { service: { name: string; img: string }, i: number, key?: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      id={`service-${service.name.toLowerCase().replaceAll(' ', '-')}`}
      className="relative bg-white border-2 border-deep-black p-2 text-center group cursor-pointer flex flex-col h-full overflow-hidden"
    >
      <div className="h-44 overflow-hidden border-2 border-deep-black mb-3 relative">
        <img 
          src={service.img} 
          alt={service.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="text-[11px] font-black uppercase group-hover:text-construction-yellow transition-colors mt-auto pb-2">{service.name}</h3>
      {/* Hover description overlay */}
      <div className="absolute inset-0 bg-deep-black/90 text-white flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <h3 className="text-sm font-black uppercase text-construction-yellow mb-2">{service.name}</h3>
        <p className="text-[11px] leading-relaxed text-white/80 text-left">{SERVICE_DESCRIPTIONS[service.name]}</p>
      </div>
    </motion.div>
  );
}
