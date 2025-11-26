'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const footerLinks = {
  explore: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/journal', label: 'Journal' },
  ],
  experiences: [
    { href: '/experiences', label: 'Safari Escapes' },
    { href: '/experiences', label: 'Coastal Retreats' },
    { href: '/experiences', label: 'Mountain Getaways' },
    { href: '/experiences', label: 'Group Retreats' },
  ],
};

const socialLinks = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
];

export function Footer() {
  return (
    <footer className="bg-[#333232] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#6F655C]/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#6F655C]/10 rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <span className="text-2xl md:text-3xl font-serif tracking-wide text-white">Yve Collective</span>
                <span className="block text-xs uppercase tracking-[0.2em] text-white/60 mt-1">Retreats & Beyond</span>
              </Link>
              <p className="text-white/70 leading-relaxed mb-6 max-w-xs">
                Curating intimate, beautifully considered getaways across Kenya and beyond.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Explore Links */}
            <div>
              <h4 className="text-lg font-serif mb-6 text-white">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiences Links */}
            <div>
              <h4 className="text-lg font-serif mb-6 text-white">Experiences</h4>
              <ul className="space-y-3">
                {footerLinks.experiences.map((link, index) => (
                  <li key={`${link.label}-${index}`}>
                    <Link 
                      href={link.href}
                      className="text-white/70 hover:text-white transition-colors duration-300 inline-flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-serif mb-6 text-white">Get in Touch</h4>
              <ul className="space-y-4">
                <li>
                  <a 
                    href="mailto:hello@yvecollective.com" 
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-start gap-3"
                  >
                    <Mail className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>hello@yvecollective.com</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+254700000000" 
                    className="text-white/70 hover:text-white transition-colors duration-300 flex items-start gap-3"
                  >
                    <Phone className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span>+254 700 000 000</span>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>Nairobi, Kenya</span>
                </li>
              </ul>
              
              {/* Newsletter */}
              <div className="mt-8">
                <p className="text-sm text-white/60 mb-3">Subscribe to our newsletter</p>
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    className="bg-white text-[#333232] px-4 py-2 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
              <p>&copy; {new Date().getFullYear()} Yve Collective. All Rights Reserved.</p>
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
