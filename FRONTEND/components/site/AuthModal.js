'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [ageGroup, setAgeGroup] = useState('25-34');
  const [referralCode, setReferralCode] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialMode]);

  if (!isOpen || !mounted) return null;

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsOtpSent(true);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    alert(`Logged in successfully with mobile number +91 ${mobileNumber}! Welcome back to VedBus.`);
    onClose();
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    if (!fullName || !email || !mobileNumber) {
      alert('Please fill out all required fields (*).');
      return;
    }
    alert(`Account created successfully for ${fullName}! Welcome to VedBus.`);
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* FLOATING GLASS CONTAINER (CENTERED & CONSTRAINED) */}
      <div
        className="bg-white/95 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] overflow-hidden max-w-4xl lg:max-w-5xl w-full border border-white/60 shadow-2xl grid grid-cols-1 md:grid-cols-12 relative animate-scaleUp my-auto max-h-[85vh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
          title="Close Dialog"
        >
          <span className="material-symbols-outlined text-[18px] sm:text-[20px]">close</span>
        </button>

        {/* =========================================================================
            LEFT COLUMN: FORM SECTION (LOGIN & SIGNUP SIDE-BY-SIDE TOGGLE)
           ========================================================================= */}
        <div className="md:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-between bg-white/90 space-y-4 sm:space-y-6 overflow-y-auto max-h-[85vh] sm:max-h-[90vh] no-scrollbar">
          
          {/* Header & Logo */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <img src="/images/logo.png" alt="VedBus Logo" className="h-7 sm:h-8 w-auto object-contain" />
              </div>

              {/* Mode Toggle Switcher */}
              <div className="p-1 bg-slate-100 rounded-full border border-slate-200/80 flex items-center shrink-0">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setIsOtpSent(false); }}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold text-[11px] sm:text-xs transition-all ${
                    mode === 'login'
                      ? 'bg-brand-scarlet text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setIsOtpSent(false); }}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold text-[11px] sm:text-xs transition-all ${
                    mode === 'signup'
                      ? 'bg-brand-scarlet text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {mode === 'login' ? (
              <>
                <h2 className="text-xl sm:text-3xl font-serif font-bold text-slate-900">Login to your account</h2>
                <p className="text-xs text-slate-500 mt-1">Enter your mobile number to continue with VedBus</p>
              </>
            ) : (
              <>
                <h2 className="text-xl sm:text-3xl font-serif font-bold text-slate-900">Create your VedBus Account</h2>
                <p className="text-xs text-slate-500 mt-1">Join thousands of travellers exploring India with comfort &amp; safety.</p>
              </>
            )}
          </div>

          {/* FORM BODY */}
          {mode === 'login' ? (
            /* LOGIN FORM */
            <form onSubmit={isOtpSent ? handleSubmitLogin : handleSendOtp} className="space-y-4">
              {/* Mobile Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Mobile Number</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl p-1.5 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-200 text-xs font-bold text-slate-800">
                    <span className="text-base">🇮🇳</span>
                    <span>+91</span>
                    <span className="material-symbols-outlined text-[14px] text-slate-400">keyboard_arrow_down</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full bg-transparent px-3 py-1.5 text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400 placeholder:font-medium"
                    required
                  />
                </div>
              </div>

              {/* Verify with OTP */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-slate-700">Verify with OTP</label>
                  {isOtpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="font-bold text-brand-scarlet hover:underline"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-full h-10 sm:h-11 text-center font-black text-slate-900 text-base sm:text-lg bg-slate-50 border border-slate-200 rounded-xl focus:border-brand-scarlet focus:bg-white outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="w-full min-h-[46px] rounded-2xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isOtpSent ? 'Verify & Continue' : 'Send Login OTP'}</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>

              {/* Social Login Divider */}
              <div className="relative my-3 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <span className="relative bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">OR</span>
              </div>

              {/* Social Auth Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => alert('Redirecting to Google Auth...')}
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => alert('Sending WhatsApp OTP...')}
                  className="flex items-center justify-center gap-2 px-3 py-2 sm:py-2.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">send_to_mobile</span>
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Mode Switcher Link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-xs font-bold text-slate-600 hover:text-brand-scarlet transition-colors"
                >
                  New to VedBus? <span className="text-brand-scarlet underline">Sign Up Now ➔</span>
                </button>
              </div>
            </form>
          ) : (
            /* SIGN UP FORM */
            <form onSubmit={handleSubmitSignup} className="space-y-3">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Full Name *</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">person</span>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Email Address *</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
                    <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">mail</span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Mobile Number *</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 focus-within:border-brand-scarlet focus-within:bg-white transition-all">
                  <div className="flex items-center gap-1.5 px-3 py-1 border-r border-slate-200 text-xs font-bold text-slate-800">
                    <span>🇮🇳 +91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full bg-transparent px-3 py-1 text-xs font-bold text-slate-900 outline-none placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              {/* Gender & Age Group */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Gender *</label>
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          gender === g
                            ? 'bg-red-50 text-brand-scarlet border border-red-200 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {g === 'Male' ? '♂ Male' : g === 'Female' ? '♀ Female' : '👤 Other'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">Age Group *</label>
                  <select
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 outline-none focus:border-brand-scarlet"
                  >
                    <option value="18-24">18-24 Years</option>
                    <option value="25-34">25-34 Years</option>
                    <option value="35-44">35-44 Years</option>
                    <option value="45+">45+ Years</option>
                  </select>
                </div>
              </div>

              {/* Referral Code */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">Referral Code (Optional)</label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-brand-scarlet">
                  <span className="material-symbols-outlined text-slate-400 text-[18px] mr-2">sell</span>
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code"
                    className="w-full bg-transparent text-xs font-bold text-slate-900 outline-none uppercase placeholder:normal-case placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Primary Signup Button */}
              <button
                type="submit"
                className="w-full min-h-[44px] rounded-xl bg-brand-scarlet hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Create VedBus Account</span>
              </button>

              {/* Switcher Link */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-xs font-bold text-slate-600 hover:text-brand-scarlet transition-colors"
                >
                  Already have an account? <span className="text-brand-scarlet underline">Log In ➔</span>
                </button>
              </div>
            </form>
          )}

          {/* BOTTOM TRUST BADGES */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
              <span className="text-[10px] font-bold text-slate-700 mt-0.5">Safe &amp; Secure</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-amber-500 text-[18px]">local_offer</span>
              <span className="text-[10px] font-bold text-slate-700 mt-0.5">0% Markup</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-cyan-600 text-[18px]">headset_mic</span>
              <span className="text-[10px] font-bold text-slate-700 mt-0.5">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: HERO BACKGROUND IMAGE & FEATURE BADGES
           ========================================================================= */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-6 sm:p-8 text-white overflow-hidden bg-slate-950 max-h-[85vh] sm:max-h-[90vh]">
          <img
            src="/images/domestic-hero.jpg"
            alt="VedBus Luxury Coach on Expressway"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/20" />

          {/* Top Pill Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
              <span className="material-symbols-outlined text-amber-400 text-[15px]">stars</span>
              <span>PREMIUM BUS TRAVEL ACROSS INDIA</span>
            </div>
          </div>

          {/* Middle Headline */}
          <div className="relative z-10 space-y-2.5">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white leading-tight">
              {mode === 'login' ? 'Comfortable Journeys for a Brighter Bharat' : 'Explore India in Greater Comfort'}
            </h3>
            <div className="w-12 h-1 bg-brand-scarlet rounded-full" />
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              Daily direct luxury BharatBenz &amp; Volvo sleeper coaches with assigned bus numbers and zero hidden aggregator fees.
            </p>
          </div>

          {/* Bottom Feature Badges */}
          <div className="relative z-10 pt-4 border-t border-white/20 grid grid-cols-2 gap-3 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">directions_bus</span>
              <span>Luxury Sleeper Coaches</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">map</span>
              <span>Pan India Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400 text-[18px]">verified</span>
              <span>Assigned Bus Plate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-pink-400 text-[18px]">money_off</span>
              <span>0% Convenience Markup</span>
            </div>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
