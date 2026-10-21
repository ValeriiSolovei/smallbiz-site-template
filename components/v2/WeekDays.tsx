import type { ScheduleDay } from '@/lib/types';

/** One column per scheduled day under an accent rule: the time, the class and the coach. Days stack on a phone. */
export default function WeekDays({ schedule }: { schedule: ScheduleDay[] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-5 md:gap-6">
      {schedule.map((d) => (
        <li key={d.day} className="week-day">
          <h3 className="h-display text-[1.625rem] font-bold">{d.day}</h3>
          <ul className="mt-3">
            {d.classes.map((c) => (
              <li key={`${c.time}-${c.name}`} className="border-t border-rule py-3">
                <p className="tabular text-small font-semibold">{c.time}</p>
                <p className="h-display mt-1 text-xl font-bold leading-tight">{c.name}</p>
                <p className="text-small text-fg-2">with {c.coach}</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
