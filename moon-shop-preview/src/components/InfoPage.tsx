import { ReactNode } from 'react';

export default function InfoPage({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="bg-brand-cream min-h-screen pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <div className="mb-16 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-px bg-brand-gold opacity-50" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-gold">
              {subtitle || 'Moon Spices & Groceries'}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif italic text-brand-green tracking-tight">{title}</h1>
        </div>
        <div className="space-y-10 text-sm leading-relaxed text-brand-green/70 font-medium [&_h2]:text-brand-green [&_h2]:font-serif [&_h2]:italic [&_h2]:text-xl [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </div>
  );
}
