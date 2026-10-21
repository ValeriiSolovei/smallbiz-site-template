import { Hanken_Grotesk, Rokkitt } from 'next/font/google';

// Fonts for this site, picked at build time through the '@site-fonts' alias in next.config.ts,
// so only this site's files are bundled and preloaded. next/font calls must stay at module scope.
// Rokkitt is a slab serif, like raised lettering on a cast plate; Hanken Grotesk is for reading.
const display = Rokkitt({ subsets: ['latin'], display: 'swap', variable: '--ff-display' });
const body = Hanken_Grotesk({ subsets: ['latin'], display: 'swap', variable: '--ff-body' });

export const fontClasses = `${display.variable} ${body.variable}`;
