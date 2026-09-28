'use client';

import React, { useState, useEffect } from 'react';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DatePickerModal({
  isOpen,
  onClose,
  onSelectDate,
  selectedDate,
  themeColor = 'red'
}) {
  const [viewDate, setViewDate] = useState(() => new Date());
  const [activeDate, setActiveDate] = useState(() => new Date());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formatDateOutput = (d) => {
    const isToday = d.toDateString() === today.toDateString();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const isTomorrow = d.toDateString() === tomorrow.toDateString();

    const dayName = SHORT_DAYS[d.getDay()];
    const fullDayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const dayNum = d.getDate();
    const monthShort = d.toLocaleDateString('en-US', { month: 'short' });

    let labelPrefix = '';
    if (isToday) labelPrefix = 'Today, ';
    else if (isTomorrow) labelPrefix = 'Tomorrow, ';

    return {
      mainText: `${labelPrefix}${dayNum} ${monthShort}`,
      subText: fullDayName,
      rawDate: d
    };
  };

  const handleDayClick = (dayNumber) => {
    const clickedDate = new Date(currentYear, currentMonth, dayNumber);
    if (clickedDate < today) return; // Prevent past dates

    setActiveDate(clickedDate);
    const result = formatDateOutput(clickedDate);
    onSelectDate(result);
    onClose();
  };

  const handleShortcutClick = (offsetDays) => {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + offsetDays);
    setActiveDate(targetDate);
    setViewDate(targetDate);
    const result = formatDateOutput(targetDate);
    onSelectDate(result);
    onClose();
  };

  // Color theme classes
  const themeStyles = {
    red: {
      accentBg: 'bg-brand-scarlet',
      accentText: 'text-brand-scarlet',
      borderFocus: 'border-brand-scarlet',
      ringColor: 'ring-red-500/20',
      badgeBg: 'bg-red-50 text-brand-scarlet border-red-200'
    },
    amber: {
      accentBg: 'bg-amber-600',
      accentText: 'text-amber-500',
      borderFocus: 'border-amber-500',
      ringColor: 'ring-amber-500/20',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    teal: {
      accentBg: 'bg-teal-600',
      accentText: 'text-teal-600',
      borderFocus: 'border-teal-600',
      ringColor: 'ring-teal-500/20',
      badgeBg: 'bg-teal-50 text-teal-700 border-teal-200'
    }
  };

  const currentTheme = themeStyles[themeColor] || themeStyles.red;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Date Picker Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className={`material-symbols-outlined text-[22px] ${currentTheme.accentText}`}>
              calendar_month
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">Select Travel Date</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Quick Choice Chips */}
        <div className="flex flex-wrap gap-2 my-4">
          <button
            onClick={() => handleShortcutClick(0)}
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => handleShortcutClick(1)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border ${currentTheme.badgeBg}`}
          >
            Tomorrow
          </button>
          <button
            onClick={() => {
              const day = today.getDay();
              const diff = (6 - day + 7) % 7 || 7;
              handleShortcutClick(diff);
            }}
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            This Saturday
          </button>
          <button
            onClick={() => handleShortcutClick(7)}
            className="px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Next Week
          </button>
        </div>

        {/* Month Navigator */}
        <div className="flex items-center justify-between my-2 px-1">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <div className="font-extrabold text-sm text-slate-900">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </div>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 uppercase my-2">
          {SHORT_DAYS.map((day) => (
            <div key={day} className="py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
          {/* Blank padding for month start day */}
          {Array.from({ length: firstDayIndex }).map((_, idx) => (
            <div key={`blank-${idx}`} className="p-2" />
          ))}

          {/* Month Days */}
          {Array.from({ length: totalDays }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateObj = new Date(currentYear, currentMonth, dayNum);
            const isPast = dateObj < today;
            const isToday = dateObj.toDateString() === today.toDateString();
            const isSelected = activeDate && dateObj.toDateString() === activeDate.toDateString();

            return (
              <button
                key={dayNum}
                disabled={isPast}
                onClick={() => handleDayClick(dayNum)}
                className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center transition-all ${
                  isPast
                    ? 'text-slate-300 cursor-not-allowed'
                    : isSelected
                    ? `${currentTheme.accentBg} text-white font-extrabold shadow-md scale-105`
                    : isToday
                    ? `border-2 ${currentTheme.borderFocus} text-slate-900 font-bold hover:bg-slate-100`
                    : 'text-slate-800 hover:bg-slate-100 font-medium'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Assigned bus number &amp; live seat map update on date select</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
