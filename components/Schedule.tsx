import type { ScheduleDay } from '@/lib/types';

export default function Schedule({ schedule }: { schedule: ScheduleDay[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">Weekly schedule</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border-default">
        <table className="w-full min-w-[32rem] text-left">
          <thead className="bg-surface-card text-sm text-text-secondary">
            <tr>
              <th scope="col" className="px-4 py-3">Day</th>
              <th scope="col" className="px-4 py-3">Time</th>
              <th scope="col" className="px-4 py-3">Class</th>
              <th scope="col" className="px-4 py-3">Coach</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-default">
            {schedule.flatMap((d) =>
              d.classes.map((c, i) => (
                <tr key={`${d.day}-${c.time}`}>
                  <td className="px-4 py-3 font-semibold">{i === 0 ? d.day : ''}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.time}</td>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{c.coach}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
