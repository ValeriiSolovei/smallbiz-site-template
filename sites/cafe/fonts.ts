import { Bodoni_Moda, Libre_Franklin } from 'next/font/google';

// Fonts for this site, picked at build time through the '@site-fonts' alias in next.config.ts,
// so only this site's files are bundled and preloaded. next/font calls must stay at module scope.
// Bodoni Moda draws the headings; its italic is only the hero's last line and the overheard quotes,
// so it loads late (no preload, no optical-size axis). Libre Franklin is for reading, and the h1.
const display = Bodoni_Moda({ subsets: ['latin'], axes: ['opsz'], display: 'swap', variable: '--ff-display' });
const voice = Bodoni_Moda({ subsets: ['latin'], style: 'italic', display: 'swap', preload: false, variable: '--ff-voice' });
const body = Libre_Franklin({ subsets: ['latin'], display: 'swap', variable: '--ff-body' });

export const fontClasses = `${display.variable} ${voice.variable} ${body.variable}`;
