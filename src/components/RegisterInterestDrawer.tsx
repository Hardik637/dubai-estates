import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, Phone, Mail, Building, ShieldCheck, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const RegisterInterestDrawer: React.FC = () => {
  const { 
    isEnquiryDrawerOpen, 
    setIsEnquiryDrawerOpen, 
    selectedDrawerProject,
    showToast 
  } = useApp();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+971',
    phone: '',
    project: selectedDrawerProject,
    unitType: '2-Bedroom Luxury Suite',
    budget: 'AED 5M - 10M',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync selected project if changed outside
  React.useEffect(() => {
    if (selectedDrawerProject) {
      setFormData(prev => ({ ...prev, project: selectedDrawerProject }));
    }
  }, [selectedDrawerProject]);

  if (!isEnquiryDrawerOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone) {
      showToast('Please fill in your name, email and phone number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      showToast('VIP Interest registered successfully! Our Private Advisor will contact you within 15 minutes.');
      
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#b88d3d', '#d4af37', '#ffffff']
        });
      } catch (err) {
        // ignore
      }
    }, 900);
  };

  const handleClose = () => {
    setIsEnquiryDrawerOpen(false);
    setIsSubmitted(false);
  };

  const projectsList = [
    'The Woods Abode - Sobha Sanctuary',
    'The Woods Serenity - Sobha Sanctuary',
    'Capeside Marina Residences - Siniya Island',
    'Skyvue Altier - Sobha Hartland II',
    'The Mirage - Sobha Central',
    'The Tranquil - Sobha Central',
    'The Element - Sobha One',
    'Sobha SeaHaven - Dubai Harbour',
    'Sobha Orbis - Motor City',
    'Sobha Solis - Motor City',
    'Palm Jumeirah Crown Mansions',
    'Downtown Skyvue Signature Suite'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#fcfbfa] shadow-2xl flex flex-col justify-between border-l border-[#e8e2d8] relative z-10 animate-slideLeft">
          
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#16191f] text-white relative">
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#b88d3d] animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
                Direct Developer Allocation
              </span>
            </div>

            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide uppercase">
              Register Your Interest
            </h2>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Receive official floor plans, handover schedule, pre-launch pricing, and priority VIP slot.
            </p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#b88d3d]/10 text-[#b88d3d] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#16191f]">
                  Interest Confirmed
                </h3>
                <p className="text-sm text-[#545c6b] max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#16191f]">{formData.firstName}</strong>. A dedicated Senior Property Advisor has reserved your confidential consultation for:
                </p>
                <div className="p-4 bg-white border border-[#e8e2d8] rounded-xl text-left max-w-xs mx-auto text-xs space-y-1">
                  <div className="text-[#545c6b]">Project:</div>
                  <div className="font-bold text-[#16191f] text-sm">{formData.project}</div>
                  <div className="text-[#545c6b] pt-1">Preferred Unit: <span className="font-semibold text-[#16191f]">{formData.unitType}</span></div>
                  <div className="text-[#545c6b]">Representative Dispatch: <span className="text-[#b88d3d] font-bold">Under 15 Mins</span></div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full bg-[#16191f] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#b88d3d] transition cursor-pointer"
                  >
                    Return to Exploration
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Preferred Project */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                    Selected Project / Launch *
                  </label>
                  <select 
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] font-medium focus:outline-none focus:border-[#b88d3d] transition cursor-pointer"
                  >
                    {projectsList.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                      First Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Tariq"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                      Last Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Al Hashimi"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d] transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="tariq@investor.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d] transition"
                  />
                </div>

                {/* Phone with Country Code */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                    Telephone Number *
                  </label>
                  <div className="flex gap-2">
                    <select 
                      value={formData.phoneCode}
                      onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                      className="w-24 px-2 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs font-medium focus:outline-none focus:border-[#b88d3d]"
                    >
                      <option value="+971">+971 (UAE)</option>
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+966">+966 (KSA)</option>
                      <option value="+49">+49 (DE)</option>
                      <option value="+33">+33 (FR)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+86">+86 (CN)</option>
                      <option value="+7">+7 (RU)</option>
                    </select>
                    <input 
                      type="tel"
                      required
                      placeholder="50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d] transition"
                    />
                  </div>
                </div>

                {/* Unit Type & Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                      Residence Type
                    </label>
                    <select 
                      value={formData.unitType}
                      onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                      className="w-full px-2.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d]"
                    >
                      <option value="1-Bedroom Luxury Suite">1-Bedroom Suite</option>
                      <option value="2-Bedroom Luxury Suite">2-Bedroom Suite</option>
                      <option value="3-Bedroom Residence">3-Bedroom Residence</option>
                      <option value="4-Bedroom Sky Villa">4-Bedroom Sky Villa</option>
                      <option value="Full Floor Penthouse">Full Floor Penthouse</option>
                      <option value="Waterfront Villa / Mansion">Waterfront Mansion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                      Investment Budget
                    </label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-2.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d]"
                    >
                      <option value="AED 2M - 4M">AED 2M - 4M</option>
                      <option value="AED 5M - 10M">AED 5M - 10M</option>
                      <option value="AED 10M - 25M">AED 10M - 25M</option>
                      <option value="AED 25M - 60M">AED 25M - 60M</option>
                      <option value="AED 60M+ Ultra Prime">AED 60M+ Ultra Prime</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#3b4352] mb-1.5">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Interested in high-floor Burj Khalifa facing units with 60/40 payment plan."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#d8d1c5] bg-white text-xs text-[#16191f] focus:outline-none focus:border-[#b88d3d] transition resize-none"
                  />
                </div>

                {/* Privacy check & consent */}
                <div className="flex items-start gap-2 pt-1 text-[11px] text-[#545c6b] leading-tight">
                  <ShieldCheck className="w-4 h-4 text-[#b88d3d] flex-shrink-0 mt-0.5" />
                  <span>
                    Your details are strictly confidential under UAE data privacy regulations. Direct developer allocation without broker markup.
                  </span>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#b88d3d] hover:bg-[#a67c2e] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#b88d3d]/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting VIP Registration...
                      </span>
                    ) : (
                      <>
                        <span>Submit Registration</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Quick Contacts Footer in Drawer */}
            <div className="border-t border-[#e8e2d8] pt-6 space-y-3">
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#3b4352]">
                Direct Private Desk Assistance
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a 
                  href="tel:+97180076242"
                  className="p-2.5 rounded-lg bg-white border border-[#e8e2d8] hover:border-[#b88d3d] flex items-center gap-2 text-[#16191f] font-medium transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#b88d3d]" />
                  <span>+971 800 76242</span>
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=971508924110&text=Hi%20Dubai%20Estates%20Team,%20I%20am%20interested%20in%20your%20luxury%20properties." 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-white border border-[#e8e2d8] hover:border-[#25D366] flex items-center gap-2 text-[#16191f] font-medium transition"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>WhatsApp VIP</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
