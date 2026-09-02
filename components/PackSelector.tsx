"use client";

import { useState } from "react";
import { PackOption } from "@/types";
import { formatPrice } from "@/lib/utils";
import EnquireButton from "./EnquireButton";

export default function PackSelector({
  productName,
  packs,
}: {
  productName: string;
  packs: PackOption[];
}) {
  const [selected, setSelected] = useState(0);
  const activePack = packs[selected];

  return (
    <div>
      <p className="font-poppins font-extrabold text-3xl text-gold-600">
        {formatPrice(activePack.price)}
        <span className="ml-2 text-base font-medium text-ink/50">
          / {activePack.weight}
        </span>
      </p>

      {packs.length > 1 && (
        <div className="mt-5">
          <span className="text-sm font-semibold text-ink/70">Pack Size</span>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Select pack size">
            {packs.map((pack, i) => (
              <button
                key={pack.weight}
                type="button"
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selected === i
                    ? "border-gold-500 bg-gold-500 text-white"
                    : "border-gold-200 bg-white text-ink hover:bg-gold-50"
                }`}
              >
                {pack.weight}
              </button>
            ))}
          </div>
        </div>
      )}

      <EnquireButton
        productName={`${productName} (${activePack.weight})`}
        className="mt-6 w-full sm:w-auto"
      />
    </div>
  );
}
