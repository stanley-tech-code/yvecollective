import Link from 'next/link';

export default function ContactOptionsPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-6">
      <div className="bg-white rounded-2xl p-10 text-center shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-serif mb-4 text-[#6F655C]">Get in Touch</h2>
        <p className="text-[#6F655C]/80 mb-8 leading-relaxed">
          Choose how you&apos;d like to connect with us — our team will be delighted to assist you.
        </p>

        <div className="space-y-4">
          {/* WhatsApp Button */}
          <a href="https://wa.me/2547XXXXXXX" target="_blank" rel="noopener noreferrer"
            className="block bg-green-500 text-white py-3 rounded-full font-medium hover:bg-green-600 transition">
            Chat via WhatsApp
          </a>

          {/* Email Button */}
          <a href="mailto:hello@yvecollective.com"
            className="block bg-[#F5F2EB] text-[#6F655C] py-3 rounded-full font-medium border border-[#ddd] hover:bg-[#F0EDE5] transition">
            Send an Email
          </a>
        </div>

        <Link href="/" className="mt-8 inline-block text-sm text-[#6F655C]/70 hover:text-[#6F655C] underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
