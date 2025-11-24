export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center text-center">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="https://cdn.coverr.co/videos/coverr-luxury-resort-view-8576/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/25"></div>
        <div className="relative z-10 px-6">
          <h2 className="text-4xl md:text-5xl font-serif leading-tight text-[#6F655C]">Let&apos;s Plan Your Next Escape</h2>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-[#6F655C]">
            Whether it&apos;s a private safari, coastal retreat, or curated group getaway we’re here to make it effortless.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 px-6 md:px-16 bg-[#F5F2EB] text-center">
        <h3 className="text-3xl md:text-4xl font-serif mb-10 text-[#6F655C]">Get in Touch</h3>
        <p className="max-w-2xl mx-auto text-lg text-[#6F655C]/90 mb-12">
          Share your travel dreams with us and we’ll curate something extraordinary.
        </p>

        {/* Contact Options */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mb-16">
          <a href="mailto:hello@yvecollective.com" className="flex items-center justify-center bg-white border border-transparent shadow-sm hover:bg-[#F0EDE5] transition px-8 py-4 rounded-full text-lg text-[#6F655C]">
            ✉️ hello@yvecollective.com
          </a>
          <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-white border border-transparent shadow-sm hover:bg-[#F0EDE5] transition px-8 py-4 rounded-full text-lg text-[#6F655C]">
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <form action="#" method="POST" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-left text-[#6F655C] mb-2">Full Name</label>
            <input type="text" id="name" name="name" className="w-full border border-[#ece7df] rounded-lg px-4 py-3 focus:outline-none focus:ring-0 focus:border-[#d7cec4] focus:shadow-[0_0_0_4px_rgba(111,101,92,0.06)]" placeholder="Your name" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-left text-[#6F655C] mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full border border-[#ece7df] rounded-lg px-4 py-3 focus:outline-none focus:ring-0 focus:border-[#d7cec4] focus:shadow-[0_0_0_4px_rgba(111,101,92,0.06)]" placeholder="you@example.com" required />
          </div>

          <div>
            <label htmlFor="message" className="block text-left text-[#6F655C] mb-2">Message</label>
            <textarea id="message" name="message" rows={5} className="w-full border border-[#ece7df] rounded-lg px-4 py-3 focus:outline-none focus:ring-0 focus:border-[#d7cec4] focus:shadow-[0_0_0_4px_rgba(111,101,92,0.06)]" placeholder="Tell us about your dream escape..." required></textarea>
          </div>

          <button type="submit" className="w-full bg-white text-[#6F655C] py-3 rounded-full font-medium border border-[#ece7df] hover:bg-[#F0EDE5] transition">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}
