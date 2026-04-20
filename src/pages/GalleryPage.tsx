import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GALLERY } from '../constants';

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {/* Page Hero */}
      <div className="page-hero">
        <img src="/images/gallery/gallery-26.jpg" alt="B. Edwards Construction gallery" className="page-hero-img" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />
        <div className="page-hero-content">
          <span className="section-label">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white">Our Work</h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label">Real Projects. Real Results.</span>
            <h2 className="section-heading">Project Gallery</h2>
            <div className="accent-line mx-auto" />
            <p className="text-gray-500 max-w-xl mx-auto mt-4 text-sm leading-relaxed">
              Every photo is a completed project right here in Louisiana. Click any image to view full size.
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {GALLERY.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.07 }}
                className="break-inside-avoid cursor-pointer group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                onClick={() => setLightbox(src)}
              >
                <img
                  src={src}
                  alt={`B. Edwards Construction project ${i + 1}`}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={lightbox}
              alt="Full size project photo"
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
