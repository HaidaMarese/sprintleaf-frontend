import { useMemo } from "react";

export default function CalendarMonth({ year, month, items = [] }) {
 
  const first = new Date(year, month, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

 
  const cells = useMemo(() => {
    const arr = Array(startDay)
      .fill(null)
      .concat([...Array(daysInMonth)].map((_, i) => i + 1));
    while (arr.length % 7 !== 0) arr.push(null);
    return arr;
  }, [startDay, daysInMonth]);

  const countsByDay = useMemo(() => {
    const map = {};
    for (const it of items) {
      if (!it?.date) continue;
      const d = new Date(it.date);
      if (d.getFullYear() !== year || d.getMonth() !== month) continue;
      const day = d.getDate();
      map[day] = (map[day] || 0) + 1;
    }
    return map;
  }, [items, year, month]);

  return (
    <div className="border rounded bg-white">
     
      <div className="grid grid-cols-7 text-center text-sm font-medium border-b">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {cells.map((d, i) => {
          const isToday =
            d &&
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === d;

          return (
            <div
              key={i}
              className={`bg-white h-20 p-1 text-xs ${
                isToday ? "ring-2 ring-emerald-500" : ""
              }`}
            >
              {d && (
                <div className="flex justify-between items-start">
                  <span className="font-semibold">{d}</span>
                  {countsByDay[d] && (
                    <span className="px-2 rounded text-white bg-emerald-600 text-[10px]">
                      {countsByDay[d]}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
