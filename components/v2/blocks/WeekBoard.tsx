import type { NavItem, ScheduleDay, Space, Tone, Voice } from '@/lib/types';
import { renderVoice } from '@/lib/voice';
import Button from '../Button';
import WeekDays from '../WeekDays';

/**
 * The gym's signature: "This week" turned on its side in columns 1-2, then one column per scheduled day,
 * each under an accent top rule, with the time, the class and the coach. Hairlines, no boxes.
 * On a phone the word lies flat and the days stack.
 */
export default function WeekBoard({ tone, space, title, schedule, more, cta }: { tone: Tone; space: Space; title: Voice; schedule: ScheduleDay[]; more: NavItem; cta: NavItem }) {
  return (
    <section data-tone={tone} data-space={space}>
      <div className="wrap grid-12 items-start">
        <h2 className="week-word h-display md:col-span-2">{renderVoice(title)}</h2>
        <div className="md:col-span-10">
          <WeekDays schedule={schedule} />
          <div className="mt-10 flex flex-col items-start gap-x-8 gap-y-3 md:flex-row md:items-center">
            <Button item={cta} block />
            <Button item={more} kind="secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
