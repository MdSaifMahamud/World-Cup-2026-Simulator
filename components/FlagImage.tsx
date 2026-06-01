"use client";
import { useState } from "react";

// Flag images served by flagcdn.com — works on all devices/OS without emoji support.
// Subdivision codes supported: gb-eng (England), gb-sct (Scotland), etc.
// URL format: https://flagcdn.com/w40/{isoCode}.png  (1×)
//             https://flagcdn.com/w80/{isoCode}.png  (2× retina)

interface Props {
  isoCode: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackEmoji?: string;
}

const SIZE: Record<string, { imgClass: string; emojiClass: string }> = {
  sm: { imgClass: "w-5 h-[15px]",  emojiClass: "text-base" },
  md: { imgClass: "w-6 h-[18px]",  emojiClass: "text-xl"   },
  lg: { imgClass: "w-8 h-6",       emojiClass: "text-2xl"  },
  xl: { imgClass: "w-14 h-[42px]", emojiClass: "text-5xl"  },
};

export default function FlagImage({
  isoCode,
  name,
  size = "md",
  className = "",
  fallbackEmoji,
}: Props) {
  const [errored, setErrored] = useState(false);
  const { imgClass, emojiClass } = SIZE[size] ?? SIZE.md;
  const code = isoCode.toLowerCase();

  if (errored && fallbackEmoji) {
    return <span className={`${emojiClass} leading-none ${className}`}>{fallbackEmoji}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      srcSet={`https://flagcdn.com/w80/${code}.png 2x`}
      alt={`${name} flag`}
      width={32}
      height={24}
      loading="lazy"
      decoding="async"
      onError={() => setErrored(true)}
      className={`inline-block object-cover rounded-[2px] shadow-sm flex-shrink-0 ${imgClass} ${className}`}
    />
  );
}
