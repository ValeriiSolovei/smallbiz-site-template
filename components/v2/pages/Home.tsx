import type { SiteConfigV2 } from '@/lib/types';
import Signboard from '../hero/Signboard';
import PhotoBlock from '../hero/PhotoBlock';
import Split from '../hero/Split';
import Specimen from '../hero/Specimen';
import HomeBlocks from '../HomeBlocks';

function Hero({ site }: { site: SiteConfigV2 }) {
  const { hero } = site;
  switch (hero.variant) {
    case 'photo-block':
      return <PhotoBlock hero={hero} hours={site.contact.hours} />;
    case 'split':
      return <Split hero={hero} buttonStyle={site.design.button} />;
    case 'specimen':
      return <Specimen hero={hero} buttonStyle={site.design.button} />;
    default:
      return <Signboard site={site} />;
  }
}

export default function HomeV2({ site }: { site: SiteConfigV2 }) {
  return (
    <>
      <Hero site={site} />
      <HomeBlocks site={site} />
    </>
  );
}
