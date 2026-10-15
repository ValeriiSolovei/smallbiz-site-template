import { Inter } from 'next/font/google';

// Fonts for this site, picked at build time through the '@site-fonts' alias in next.config.ts,
// so only this site's files are bundled and preloaded. next/font calls must stay at module scope.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const fontClasses = inter.variable;
