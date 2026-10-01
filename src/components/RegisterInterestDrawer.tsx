import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const RegisterInterestDrawer: React.FC = () => {
  const { 
    isEnquiryDrawerOpen, 
    setIsEnquiryDrawerOpen, 
    selectedDrawerProject,
    showToast 
  } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isEnquiryDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    showToast('Your advisory mandate has been registered with our Senior Partner.');
  };

  const handleClose = () => {
    setIsEnquiryDrawerOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-[#FFFFFF] text-[#111111] h-full shadow-2xl p-8 sm:p-12 overflow-y-auto flex flex-col justify-between border-l border-[#E7E3DA]"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E3DA] mb-8">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8A877F] block">
                Private Advisory
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#111111] font-light">
                Direct Consultation
              </h3>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 text-[#8A877F] hover:text-[#111111] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Focus */}
          <div className="p-4 bg-[#F7F4EC] border border-[#E7E3DA] mb-8">
            <span className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">
              Active Focus
            </span>
            <span className="text-xs font-medium text-[#111111]">
              {selectedDrawerProject}
            </span>
          </div>

          {isSubmitted ? (
            <div className="py-16 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#111111] mx-auto" />
              <h4 className="font-editorial text-2xl text-[#111111]">Mandate Received</h4>
              <p className="text-xs text-[#8A877F] font-light max-w-xs mx-auto">
                Our Private Client Advisory Desk in DIFC will review your mandate and initiate confidential contact.
              </p>
              <button onClick={handleClose} className="btn-editorial-primary mt-4">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs text-[#111111] bg-[#F7F4EC] border border-[#E7E3DA] p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs text-[#111111] bg-[#F7F4EC] border border-[#E7E3DA] p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Direct Phone (WhatsApp)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs text-[#111111] bg-[#F7F4EC] border border-[#E7E3DA] p-3 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-[#8A877F] block mb-1">Private Requirements</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Specific community preferences, square footage, budget parameters..."
                  className="w-full text-xs text-[#111111] bg-[#F7F4EC] border border-[#E7E3DA] p-3 focus:outline-none resize-none"
                />
              </div>

              <button type="submit" className="btn-editorial-primary w-full justify-center">
                <span>Submit Confidential Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-6 border-t border-[#E7E3DA] text-[10px] font-mono text-[#8A877F] text-center">
          DIFC Advisory Desk • Licensed under RERA ORN #88921
        </div>
      </div>
    </div>
  );
};
