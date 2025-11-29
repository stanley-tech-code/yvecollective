'use client';

import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, User, AtSign, MessageSquare } from 'lucide-react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[65vh] flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-luxury-resort-view-8576/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

        <div className="relative z-10 px-6 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif leading-tight text-white drop-shadow-lg"
          >
            Let&apos;s Plan Your
            <br />
            <span className="text-white/90">Next Escape</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-white/80"
          >
            Whether it&apos;s a private safari, coastal retreat, or curated group getaway — we&apos;re here to make it effortless.
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F2EB] to-transparent" />
      </section>

      {/* Contact Info Section */}
      <section className="py-24 px-6 md:px-16 bg-[#F5F2EB] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/50 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/50 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#333232]">Get in Touch</h2>
            <p className="max-w-2xl mx-auto text-lg text-[#6F655C]/80">
              Share your travel dreams with us and we&apos;ll curate something extraordinary.
            </p>
          </ScrollReveal>

          {/* Contact Options */}
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-16 max-w-2xl mx-auto">
            <ScrollReveal delay={0.1} className="flex-1">
              <motion.a
                href="mailto:info.chyvegroup@gmail.com"
                className="flex items-center justify-center gap-3 bg-white border border-transparent shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-5 rounded-2xl text-lg text-[#6F655C] hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail className="w-5 h-5" />
                info.chyvegroup@gmail.com
              </motion.a>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="flex-1">
              <motion.a
                href="https://wa.me/254791405180"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-5 rounded-2xl text-lg hover:-translate-y-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </motion.a>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal delay={0.3}>
            <motion.form
              action="#"
              method="POST"
              className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-serif text-[#333232] mb-2">Send us a Message</h3>
                <p className="text-[#6F655C]/70">We&apos;ll get back to you within 24 hours</p>
              </div>

              <div className="space-y-5">
                <div className="relative">
                  <label htmlFor="name" className="block text-left text-[#6F655C] font-medium mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F655C]/40" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full border border-[#ece7df] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#6F655C] focus:shadow-[0_0_0_4px_rgba(111,101,92,0.08)] transition-all duration-300 bg-[#FAFAF8]"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="email" className="block text-left text-[#6F655C] font-medium mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6F655C]/40" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border border-[#ece7df] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#6F655C] focus:shadow-[0_0_0_4px_rgba(111,101,92,0.08)] transition-all duration-300 bg-[#FAFAF8]"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="message" className="block text-left text-[#6F655C] font-medium mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-[#6F655C]/40" />
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full border border-[#ece7df] rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-[#6F655C] focus:shadow-[0_0_0_4px_rgba(111,101,92,0.08)] transition-all duration-300 bg-[#FAFAF8] resize-none"
                      placeholder="Tell us about your dream escape..."
                      required
                    />
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                className="w-full bg-[#6F655C] text-white py-4 rounded-xl font-medium hover:bg-[#5a534b] transition-colors duration-300 flex items-center justify-center gap-2 group"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                Send Message
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </motion.form>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
