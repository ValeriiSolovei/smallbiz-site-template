import { Barlow_Condensed, Public_Sans } from 'next/font/google';

// Fonts for this site, picked at build time through the '@site-fonts' alias in next.config.ts,
// so only this site's files are bundled and preloaded. next/font calls must stay at module scope.
// Barlow Condensed is static: only the two weights the design uses (600 labels and buttons, 800 display).
const display = Barlow_Condensed({ subsets: ['latin'], weight: ['600', '800'], display: 'swap', variable: '--ff-display' });
const body = Public_Sans({ subsets: ['latin'], display: 'swap', variable: '--ff-body' });

export const fontClasses = `${display.variable} ${body.variable}`;
