import { Newsreader } from 'next/font/google';

// Fonts for this site, picked at build time through the '@site-fonts' alias in next.config.ts,
// so only this site's files are bundled and preloaded. next/font calls must stay at module scope.
// One editorial serif, light weight, for headings and reading. Its italic is the voice: Latin plant names,
// labels and the second half of headlines, so it loads late (no preload, no optical-size axis).
// No optical-size axis: with it the preloaded file was 129 KB, over the 100 KB budget.
const display = Newsreader({ subsets: ['latin'], display: 'swap', variable: '--ff-display' });
const voice = Newsreader({ subsets: ['latin'], style: 'italic', display: 'swap', preload: false, variable: '--ff-voice' });

export const fontClasses = `${display.variable} ${voice.variable}`;
