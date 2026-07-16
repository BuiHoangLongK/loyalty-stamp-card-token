'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { usePathname } from '@/i18n/routing';

// Hoist the transition config to a module-level constant. Previously it was
// a fresh object literal on every render, which framer-motion treated as a
// change and re-triggered the enter animation. Combined with AnimatePresence
// seeing a child whose identity shifted (because the children prop changed
// when RequireAuth flipped from loading-pass-through to the authed branch),
// the page entry animation would play multiple times in quick succession.
// The stable reference + direct animate values (no variants indirection)
// is the recommended pattern for Next.js App Router page transitions.
const TRANSITION = { duration: 0.2, ease: 'easeOut' } as const;
const INITIAL = { opacity: 0, y: 8 } as const;
const ANIMATE = { opacity: 1, y: 0 } as const;
const EXIT = { opacity: 0, y: -8 } as const;

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={INITIAL}
        animate={ANIMATE}
        exit={EXIT}
        transition={TRANSITION}
        className="h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
