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
          colors: ['#c87a50', '#df8a5e', '#f5ede6']
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
    'Palm Jumeirah Signature Beachfront Villa',
    'Downtown Dubai Sky Penthouse with Burj Khalifa View',
    'Dubai Hills Estate Contemporary Fairway Villa',
    'Dubai Marina Duplex Sky Penthouse',
    'Emirates Hills Montgomerie Golf Estate',
    'Jumeirah Bay Island Contemporary Waterfront Residence',
    'Off-Market Private Portfolio Advisory Mandate',
    'General Private Portfolio Inquiry'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#221915] text-[#f5ede6] shadow-2xl flex flex-col justify-between border-l border-[#3d2f27] relative z-10 animate-slideLeft">
          
          {/* Header */}
          <div className="p-6 sm:p-8 bg-[#18110e] text-[#f5ede6] border-b border-[#3d2f27] relative">
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full text-[#baa99c] hover:text-white hover:bg-white/10 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#c87a50] animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-[#df8a5e] uppercase font-semibold">
                Direct Developer Allocation
              </span>
            </div>

            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide uppercase text-[#f5ede6]">
              Register Your Interest
            </h2>
            <p className="text-xs text-[#baa99c] mt-1 leading-relaxed font-light">
              Receive official floor plans, handover schedule, pre-launch pricing, and priority VIP slot.
            </p>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#c87a50]/20 text-[#df8a5e] flex items-center justify-center mx-auto border border-[#c87a50]/30">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-luxury text-2xl font-bold text-[#f5ede6]">
                  Interest Confirmed
                </h3>
                <p className="text-sm text-[#baa99c] max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong className="text-[#f5ede6]">{formData.firstName}</strong>. A dedicated Senior Property Advisor has reserved your confidential consultation for:
                </p>
                <div className="p-4 bg-[#2b201a] border border-[#3d2f27] rounded-xl text-left max-w-xs mx-auto text-xs space-y-1.5">
                  <div className="text-[#baa99c]">Project:</div>
                  <div className="font-bold text-[#f5ede6] text-sm">{formData.project}</div>
                  <div className="text-[#baa99c] pt-1">Preferred Unit: <span className="font-semibold text-[#f5ede6]">{formData.unitType}</span></div>
                  <div className="text-[#baa99c]">Representative Dispatch: <span className="text-[#df8a5e] font-bold">Under 15 Mins</span></div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full bg-[#c87a50] hover:bg-[#b8683b] text-white text-xs font-bold tracking-widest uppercase transition cursor-pointer"
                  >
                    Return to Exploration
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Preferred Project */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                    Selected Project / Launch *
                  </label>
                  <select 
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] font-medium focus:outline-none focus:border-[#c87a50] transition cursor-pointer"
                  >
                    {projectsList.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                      First Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Tariq"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                      Last Name *
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. Al Hashimi"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50] transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="tariq@investor.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50] transition"
                  />
                </div>

                {/* Phone with Country Code */}
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                    Telephone Number *
                  </label>
                  <div className="flex gap-2">
                    <select 
                      value={formData.phoneCode}
                      onChange={(e) => setFormData({ ...formData, phoneCode: e.target.value })}
                      className="w-24 px-2 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] font-medium focus:outline-none focus:border-[#c87a50]"
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
                      className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50] transition"
                    />
                  </div>
                </div>

                {/* Unit Type & Budget */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                      Residence Type
                    </label>
                    <select 
                      value={formData.unitType}
                      onChange={(e) => setFormData({ ...formData, unitType: e.target.value })}
                      className="w-full px-2.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] focus:outline-none focus:border-[#c87a50]"
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
                    <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                      Investment Budget
                    </label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-2.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] focus:outline-none focus:border-[#c87a50]"
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
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-[#baa99c] mb-1.5">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Interested in high-floor Burj Khalifa facing units with 60/40 payment plan."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#3d2f27] bg-[#2b201a] text-xs text-[#f5ede6] placeholder-[#857467] focus:outline-none focus:border-[#c87a50] transition resize-none"
                  />
                </div>

                {/* Privacy check & consent */}
                <div className="flex items-start gap-2 pt-1 text-[11px] text-[#baa99c] leading-tight font-light">
                  <ShieldCheck className="w-4 h-4 text-[#c87a50] flex-shrink-0 mt-0.5" />
                  <span>
                    Your details are strictly confidential under UAE data privacy regulations. Direct developer allocation without broker markup.
                  </span>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-lg bg-[#c87a50] hover:bg-[#b8683b] text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#c87a50]/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
            <div className="border-t border-[#3d2f27] pt-6 space-y-3">
              <p className="text-[11px] font-bold tracking-wider uppercase text-[#baa99c]">
                Direct Private Desk Assistance
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a 
                  href="tel:+97180076242"
                  className="p-2.5 rounded-lg bg-[#2b201a] border border-[#3d2f27] hover:border-[#c87a50] flex items-center gap-2 text-[#f5ede6] font-medium transition"
                >
                  <Phone className="w-3.5 h-3.5 text-[#df8a5e]" />
                  <span>+971 800 76242</span>
                </a>
                <a 
                  href="https://api.whatsapp.com/send?phone=971508924110&text=Hi%20Dubai%20Estates%20Team,%20I%20am%20interested%20in%20your%20luxury%20properties." 
                  target="_blank" 
                  rel="noreferrer"
                  className="p-2.5 rounded-lg bg-[#2b201a] border border-[#3d2f27] hover:border-[#25D366] flex items-center gap-2 text-[#f5ede6] font-medium transition"
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
