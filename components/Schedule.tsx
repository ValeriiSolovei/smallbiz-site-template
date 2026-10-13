import type { ScheduleDay } from '@/lib/types';

export default function Schedule({ schedule }: { schedule: ScheduleDay[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Weekly schedule</h2>
      {/* Phones: one card per day, so nothing is cut off or hidden behind a sideways scroll */}
      <div className="mt-6 space-y-4 md:hidden">
        {schedule.map((d) => (
          <div key={d.day} className="rounded-2xl border border-border-default bg-surface-card p-4">
            <h3 className="font-semibold">{d.day}</h3>
            <ul className="mt-2 divide-y divide-border-default">
              {d.classes.map((c) => (
                <li key={c.time} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2">
                  <span className="text-text-secondary">{c.time}</span>
                  <span className="font-medium">{c.name}</span>
                  <span className="w-full text-sm text-text-muted">with {c.coach}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Wider screens: the full table */}
      <div className="mt-6 hidden overflow-hidden rounded-2xl border border-border-default md:block">
        <table className="w-full text-left">
          <thead className="bg-surface-card text-sm text-text-secondary">
            <tr>
              <th scope="col" className="px-4 py-3">Day</th>
              <th scope="col" className="px-4 py-3">Time</th>
              <th scope="col" className="px-4 py-3">Class</th>
              <th scope="col" className="px-4 py-3">Coach</th>
            </tr>
          </thead>
          {schedule.map((d) => (
            <tbody key={d.day} className="border-t border-border-default">
              {d.classes.map((c, i) => (
                <tr key={c.time} className={i > 0 ? 'border-t border-border-default' : undefined}>
                  {i === 0 && (
                    <th scope="rowgroup" rowSpan={d.classes.length} className="px-4 py-3 align-top font-semibold">
                      {d.day}
                    </th>
                  )}
                  <td className="px-4 py-3 text-text-secondary">{c.time}</td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 text-text-secondary">with {c.coach}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
