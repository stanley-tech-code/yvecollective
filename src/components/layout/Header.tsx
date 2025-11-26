'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/experiences', label: 'Experiences' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight group">
            <motion.span 
              className={`text-2xl md:text-3xl font-serif tracking-wide transition-colors duration-300 ${
                scrolled ? 'text-[#6F655C]' : 'text-white drop-shadow-md'
              }`}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.2 }}
            >
              Yve Collective
            </motion.span>
            <span className={`text-xs md:text-sm uppercase tracking-[0.2em] transition-colors duration-300 ${
              scrolled ? 'text-[#6F655C]/70' : 'text-white/80'
            }`}>
              Retreats & Beyond
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                <span className={`font-medium transition-colors duration-300 ${
                  scrolled 
                    ? 'text-[#6F655C] hover:text-[#4a433b]' 
                    : 'text-white/90 hover:text-white'
                }`}>
                  {link.label}
                </span>
                {/* Animated underline */}
                <motion.span
                  className={`absolute -bottom-1 left-0 h-0.5 ${
                    scrolled ? 'bg-[#6F655C]' : 'bg-white'
                  }`}
                  initial={{ width: pathname === link.href ? '100%' : '0%' }}
                  animate={{ width: pathname === link.href ? '100%' : '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-full transition-colors duration-300 ${
              scrolled 
                ? 'text-[#6F655C] hover:bg-[#6F655C]/10' 
                : 'text-white hover:bg-white/10'
            }`}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-[80%] max-w-sm bg-[#F5F2EB]/95 backdrop-blur-xl z-50 md:hidden shadow-2xl"
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-[#6F655C] hover:bg-[#6F655C]/10 rounded-full transition-colors"
                whileTap={{ scale: 0.95 }}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Logo */}
              <div className="pt-20 px-8">
                <Link href="/" className="flex flex-col" onClick={() => setIsOpen(false)}>
                  <span className="text-2xl font-serif tracking-wide text-[#6F655C]">Yve Collective</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#6F655C]/70">Retreats & Beyond</span>
                </Link>
              </div>

              {/* Nav Links */}
              <nav className="mt-12 px-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 text-lg font-medium border-b border-[#6F655C]/10 transition-colors ${
                        pathname === link.href
                          ? 'text-[#6F655C]'
                          : 'text-[#6F655C]/70 hover:text-[#6F655C]'
                      }`}
                    >
                      {link.label}
                      {pathname === link.href && (
                        <motion.span
                          layoutId="activeIndicator"
                          className="inline-block ml-2 w-1.5 h-1.5 rounded-full bg-[#6F655C]"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 left-8 right-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 text-center bg-[#6F655C] text-white rounded-full font-medium hover:bg-[#5a534b] transition-colors"
                >
                  Plan Your Escape
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
