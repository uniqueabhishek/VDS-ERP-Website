import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap', // Use swap to prevent layout shift
  variable: '--font-manrope', // CSS variable for Tailwind integration
});
