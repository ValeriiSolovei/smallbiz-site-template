import type { MenuSection, NavItem, Space, Tone, Voice } from '@/lib/types';
import Section from '../Section';
import MenuList from '../MenuList';
import Button from '../Button';

/** Part of the menu on a cream card inset on the page's ground (an inverse tone nested inside, not a band). */
export default function Menu({ tone, space, title, sections, cta }: { tone: Tone; space: Space; title: Voice; sections: MenuSection[]; cta: NavItem }) {
  return (
    <Section tone={tone} space={space} title={title}>
      <div className="grid-12">
        <div data-tone="inverse" className="px-6 py-10 md:col-span-10 md:col-start-2 md:px-12 md:py-14">
          <MenuList sections={sections} />
          <div className="mt-12">
            <Button item={cta} block />
          </div>
        </div>
      </div>
    </Section>
  );
}
