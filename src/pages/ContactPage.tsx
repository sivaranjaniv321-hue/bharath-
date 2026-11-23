import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { RESTAURANT_CONFIG } from '../config/restaurant';

export function ContactPage() {
  const [name, setName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneOrEmail.trim() || !message.trim()) {
      setError('Please fill in your name, contact detail, and message.');
      return;
    }
    setError(null);
    setSent(true);
    setName('');
    setPhoneOrEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6E141D] mb-2">
          Get in Touch
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#2C1A15]">
          Contact {RESTAURANT_CONFIG.name}
        </h1>
        <p className="text-sm sm:text-base text-[#5C453E] mt-2 leading-relaxed">
          Have questions about catering, banana leaf feasts, or delivery areas? Reach
          out using our contact form or update the placeholder details below with your
          real restaurant contact info.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Restaurant Details + Map Placeholder */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E5D9C8] rounded-2xl p-6 space-y-5">
            <h2 className="font-display text-2xl font-bold text-[#2C1A15]">
              {RESTAURANT_CONFIG.name}
            </h2>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#6E141D] shrink-0 mt-0.5" />
              <div className="text-sm text-[#5C453E]">
                <p className="font-semibold text-[#2C1A15]">Restaurant Address</p>
                <p className="mt-0.5">{RESTAURANT_CONFIG.addressPlaceholder.line1}</p>
                <p>{RESTAURANT_CONFIG.addressPlaceholder.line2}</p>
                <p>{RESTAURANT_CONFIG.addressPlaceholder.cityState}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#6E141D] shrink-0 mt-0.5" />
              <div className="text-sm text-[#5C453E]">
                <p className="font-semibold text-[#2C1A15]">Phone Number</p>
                <p className="mt-0.5">{RESTAURANT_CONFIG.phoneDisplayPlaceholder}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-[#1B7A43] shrink-0 mt-0.5" />
              <div className="text-sm text-[#5C453E]">
                <p className="font-semibold text-[#2C1A15]">WhatsApp Order Desk</p>
                <p className="mt-0.5">
                  {RESTAURANT_CONFIG.whatsappDisplayPlaceholder}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-[#F0E6D8]">
              <Clock className="w-5 h-5 text-[#6E141D] shrink-0 mt-0.5" />
              <div className="text-sm text-[#5C453E] w-full">
                <p className="font-semibold text-[#2C1A15] mb-1.5">Opening Hours</p>
                <ul className="space-y-1">
                  {RESTAURANT_CONFIG.openingHours.map((slot) => (
                    <li
                      key={slot.label}
                      className="flex items-center justify-between gap-2 text-xs sm:text-sm"
                    >
                      <span>{slot.label}</span>
                      <span className="font-semibold text-[#2C1A15] tabular-nums">
                        {slot.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Google Maps Location Placeholder */}
          <div className="bg-[#F4ECE0] border border-[#E5D9C8] rounded-2xl p-6 text-center space-y-2">
            <div className="w-11 h-11 rounded-full bg-white border border-[#E5D9C8] text-[#6E141D] flex items-center justify-center mx-auto">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-[#2C1A15]">
              Google Maps Location Placeholder
            </h3>
            <p className="text-xs text-[#5C453E] leading-relaxed max-w-sm mx-auto">
              Embed your official Google Maps location iframe or coordinates here once
              your restaurant street address is finalized.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <section className="lg:col-span-7 bg-white border border-[#E5D9C8] rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold text-[#2C1A15] mb-1">
            Send Us a Message
          </h2>
          <p className="text-xs text-[#665048] mb-6">
            For event catering inquiries, custom meal boxes, or feedback.
          </p>

          {sent && (
            <div className="mb-6 p-4 rounded-xl bg-[#EEF7F1] border border-[#BBDDC8] text-sm text-[#1B7A43] flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                Thank you for contacting Bharath Delights! Your inquiry has been
                recorded. Connect a backend email handler or WhatsApp link to route
                messages directly to your inbox.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Your Name <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-detail"
                  className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
                >
                  Phone or Email <span className="text-[#9E1C20]">*</span>
                </label>
                <input
                  id="contact-detail"
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="Mobile number or email address"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
              >
                Subject (Optional)
              </label>
              <input
                id="contact-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Family Catering / Table Inquiry"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold text-[#2C1A15] mb-1.5"
              >
                Message <span className="text-[#9E1C20]">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8CBB8] bg-[#FCF8F1] text-sm focus:outline-none focus:border-[#6E141D]"
              />
            </div>

            {error && <p className="text-xs text-[#9E1C20]">{error}</p>}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6E141D] text-[#FCF8F1] font-semibold text-sm hover:bg-[#520D14] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
