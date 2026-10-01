import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, Building2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Buying Luxury Property');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received by our DIFC Private Client Desk.');
  };

  return (
    <div className="min-h-screen bg-transparent pt-24 sm:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        
        {/* Header matching Figma 11 */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#c87a50] font-semibold mb-2 inline-block">
            VIP Advisory & Client Relations
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-white leading-tight">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#baa99c] mt-3">
            We're here to help you find the right property, structure your UAE Golden Visa, or answer any questions with discretion.
          </p>
        </div>

        {/* 3 Contact Cards matching Figma 11: Visit Our Office, Call Us, Email Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center hover:border-[#c87a50]/40 transition">
            <div className="w-12 h-12 rounded-xl bg-[#c87a50]/10 border border-[#c87a50]/20 flex items-center justify-center text-[#c87a50] mx-auto mb-3">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 font-serif-luxury">Visit Our Office</h3>
            <p className="text-xs text-[#baa99c] leading-relaxed">
              Level 42, Burj Daman Tower, DIFC<br />Dubai, United Arab Emirates
            </p>
          </div>

          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center hover:border-[#c87a50]/40 transition">
            <div className="w-12 h-12 rounded-xl bg-[#c87a50]/10 border border-[#c87a50]/20 flex items-center justify-center text-[#c87a50] mx-auto mb-3">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 font-serif-luxury">Call Us</h3>
            <p className="text-xs text-[#baa99c] leading-relaxed">
              Main Desk: +971 4 812 5590<br />
              WhatsApp VIP: +971 50 123 4567
            </p>
          </div>

          <div className="bg-[#221915] border border-[#3d2f27] rounded-2xl p-6 text-center hover:border-[#c87a50]/40 transition">
            <div className="w-12 h-12 rounded-xl bg-[#c87a50]/10 border border-[#c87a50]/20 flex items-center justify-center text-[#c87a50] mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1 font-serif-luxury">Email Us</h3>
            <p className="text-xs text-[#baa99c] leading-relaxed">
              vip@dubaiestates.ae<br />
              inquiries@dubaiestates.ae
            </p>
          </div>
        </div>

        {/* 2-Column: Form & Headquarters details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-[#221915] border border-[#3d2f27] rounded-3xl p-6 sm:p-10 shadow-xl">
            <h2 className="text-xl font-bold font-serif-luxury text-white mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-[#baa99c] mb-6">
              Our Senior Fiduciary Consultants typically respond within 2 hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-8 text-center animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">Message Received</h3>
                <p className="text-xs text-[#baa99c] max-w-sm mx-auto mb-4">
                  Thank you, {name}. A dedicated senior advisor from our DIFC team will reach out to you via your preferred channel.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-[#c87a50] underline cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#baa99c] block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Hardik"
                      className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#baa99c] block mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hardik@luxuryinvest.ae"
                      className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#baa99c] block mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#baa99c] block mb-1">Inquiry Topic</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c87a50]"
                    >
                      <option>Buying Luxury Property</option>
                      <option>Selling / Listing My Property</option>
                      <option>Leasing & Rental Portfolios</option>
                      <option>UAE 10-Year Golden Visa</option>
                      <option>Off-Plan Exclusive Allocations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#baa99c] block mb-1">Message / Requirements</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your property requirements, preferred community, or budget..."
                    className="w-full bg-[#18110e] border border-[#3d2f27] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#c87a50] resize-none h-28"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cognac-btn py-3 rounded-xl text-xs font-bold text-center cursor-pointer shadow-lg"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#221915] border border-[#3d2f27] rounded-3xl p-6 sm:p-8 space-y-5">
              <h3 className="text-base font-bold font-serif-luxury text-white">
                Hours of Operation
              </h3>
              <div className="space-y-3 text-xs text-[#baa99c]">
                <div className="flex justify-between py-1 border-b border-[#3d2f27]">
                  <span>Monday – Friday:</span>
                  <span className="font-semibold text-white">9:00 AM – 8:00 PM GST</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#3d2f27]">
                  <span>Saturday:</span>
                  <span className="font-semibold text-white">10:00 AM – 6:00 PM GST</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#3d2f27]">
                  <span>Sunday:</span>
                  <span className="text-[#c87a50] font-semibold">Private Viewings by Appointment</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#3d2f27]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#c87a50] mb-2">Direct WhatsApp Hotline</h4>
                <p className="text-xs text-[#baa99c] mb-3">
                  For urgent inquiries regarding high-value acquisitions or off-market sales:
                </p>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp Directly</span>
                </a>
              </div>
            </div>

            <div className="bg-[#c87a50]/10 border border-[#c87a50]/30 rounded-3xl p-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#c87a50] mb-1">Confidentiality Guarantee</h4>
              <p className="text-xs text-[#baa99c] leading-relaxed">
                All client communications are bound by strict non-disclosure agreements (NDAs) to protect the privacy and asset holdings of our sovereign and high-net-worth patrons.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

