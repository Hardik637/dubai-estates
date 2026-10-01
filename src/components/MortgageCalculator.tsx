import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, DollarSign, Calendar, Percent, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  propertyPriceAED: number;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPriceAED }) => {
  const { formatPrice, currency } = useApp();

  const [price, setPrice] = useState<number>(propertyPriceAED);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20% for UAE nationals/residents
  const [tenureYears, setTenureYears] = useState<number>(25);
  const [interestRate, setInterestRate] = useState<number>(4.49); // Average UAE bank rate

  const downPaymentAmount = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPaymentAmount;

  // Monthly interest rate and payments
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = tenureYears * 12;

  const monthlyEMI = monthlyRate > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : loanAmount / totalMonths;

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Dubai statutory acquisition costs
  const dldFee = price * 0.04; // 4% DLD fee
  const trusteeFee = 4200; // standard AED trustee fee
  const agencyFee = price * 0.02; // 2% standard brokerage

  return (
    <div className="bg-[#111a2e] border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">UAE Mortgage Calculator</h3>
            <p className="text-xs text-slate-400">Calculate monthly repayments & acquisition costs</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 bg-amber-500/10 text-amber-400 rounded-md font-medium border border-amber-500/20">
          Pre-approved Bank Rates
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-5">
          {/* Property Price */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 flex justify-between">
              <span>Property Price</span>
              <span className="text-amber-400 font-bold">{formatPrice(price)}</span>
            </label>
            <input 
              type="range"
              min={1000000}
              max={80000000}
              step={250000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Down payment */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-amber-400 font-bold">{formatPrice(downPaymentAmount)}</span>
            </div>
            <input 
              type="range"
              min={15}
              max={60}
              step={5}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>15% (Min UAE Res.)</span>
              <span>20% (Standard)</span>
              <span>50%</span>
            </div>
          </div>

          {/* Loan Duration */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Loan Duration</span>
              <span className="text-amber-400 font-bold">{tenureYears} Years</span>
            </div>
            <input 
              type="range"
              min={5}
              max={25}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5 Yrs</span>
              <span>15 Yrs</span>
              <span>25 Yrs (Max)</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <span>Annual Interest Rate</span>
              <span className="text-amber-400 font-bold">{interestRate.toFixed(2)}%</span>
            </div>
            <input 
              type="range"
              min={3.5}
              max={7.5}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-[#0b111e] rounded-xl p-5 border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Estimated Monthly Payment</span>
            <div className="text-3xl font-bold font-serif-luxury text-amber-400 mt-1">
              {formatPrice(Math.round(monthlyEMI))}
              <span className="text-xs text-slate-400 font-sans font-normal ml-2">/ month</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Principal Loan Amount:</span>
                <span className="font-semibold text-white">{formatPrice(loanAmount)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Interest Payable:</span>
                <span className="font-semibold text-white">{formatPrice(Math.round(totalInterest))}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Dubai Land Dept (DLD 4%):</span>
                <span className="font-semibold text-amber-400/90">{formatPrice(dldFee)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Agency Fee (2% + VAT):</span>
                <span className="font-semibold text-slate-300">{formatPrice(agencyFee)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/20 mb-3">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>We connect you with Emirates NBD, ADCB & FAB private mortgage bankers for preferential rates.</span>
            </div>
            <button 
              onClick={() => alert(`Pre-qualification request initiated for ${formatPrice(loanAmount)} mortgage!`)}
              className="w-full gold-btn py-2.5 rounded-lg text-xs font-bold text-center cursor-pointer"
            >
              Request Fast Pre-Approval
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
