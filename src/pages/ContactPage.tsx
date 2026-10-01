import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Private Property Acquisition');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been routed to our DIFC Private Office Desk.');
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] pt-28 sm:pt-36 pb-24">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="border-b border-[#E7E3DA] pb-12 mb-16">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block mb-2">
            Confidential Consultation
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-[#111111] font-light">
            Contact The Private Office
          </h1>
          <p className="text-sm text-[#2B2A27] font-light mt-3 max-w-lg">
            Our advisory directors in DIFC represent buyers, sellers, and family offices with sovereign-grade discretion.
          </p>
        </div>

        {/* 2 Columns: Office Location Details + Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Desk Details */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block mb-4">
                DIFC Headquarters
              </span>
              <h3 className="font-editorial text-2xl text-[#111111] font-light mb-3">
                Dubai International Financial Centre
              </h3>
              <p className="text-xs sm:text-sm text-[#2B2A27] font-light leading-relaxed">
                Burj Daman Tower, Level 42<br />
                DIFC, P.O. Box 507119<br />
                Dubai, United Arab Emirates
              </p>
            </div>

            <div className="pt-8 border-t border-[#E7E3DA] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block">
                Direct Channels
              </span>
              
              <div className="space-y-3 text-xs sm:text-sm">
                <p className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#8A877F]" />
                  <span className="font-mono text-[#111111]">+971 4 800 3782</span>
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#8A877F]" />
                  <span className="font-mono text-[#111111]">private@dubaiestates.ae</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#F7F4EC] border border-[#E7E3DA] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#8A877F] block">
                Regulatory Credentials
              </span>
              <p className="text-xs text-[#2B2A27] font-light">
                Licensed under the Real Estate Regulatory Agency (RERA). Office Registration Number (ORN): 88921.
              </p>
            </div>
          </div>

          {/* Right Column: Confidential Form */}
          <div className="lg:col-span-7 bg-[#F7F4EC] border border-[#E7E3DA] p-8 sm:p-12">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#111111] mx-auto" />
                <h3 className="font-editorial text-2xl text-[#111111]">Inquiry Received</h3>
                <p className="text-xs text-[#8A877F] max-w-sm mx-auto font-light">
                  An Advisory Partner will review your inquiry and initiate confidential contact within four business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8A877F] block mb-1">
                    Direct Inquiry
                  </span>
                  <h3 className="font-editorial text-2xl text-[#111111] font-light">
                    Request an Advisory Consultation
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Mandate Objective</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none cursor-pointer"
                    >
                      <option value="Private Property Acquisition">Private Property Acquisition</option>
                      <option value="Listing Mandate & Consignment">Listing Mandate & Consignment</option>
                      <option value="UAE 10-Year Golden Visa">UAE 10-Year Golden Visa</option>
                      <option value="Off-Market Portfolio Inquiry">Off-Market Portfolio Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide desired community, budget parameters, or property specifications..."
                    className="w-full text-xs text-[#111111] bg-white border border-[#E7E3DA] p-3 focus:outline-none resize-none"
                  />
                </div>

                <button type="submit" className="btn-editorial-primary w-full justify-center">
                  <span>Send Confidential Message</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
