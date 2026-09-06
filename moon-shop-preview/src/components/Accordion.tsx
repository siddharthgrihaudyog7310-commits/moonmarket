import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

export default function Accordion({ items, defaultOpen = 0 }: { items: AccordionItem[]; defaultOpen?: number | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-brand-green/10 border-t border-b border-brand-green/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left group"
              aria-expanded={isOpen}
            >
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-green group-hover:text-brand-gold transition-colors">
                {item.title}
              </span>
              <ChevronDown
                size={16}
                className={`text-brand-gold shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="pb-6 text-[13px] leading-relaxed text-brand-green/60 font-medium">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
