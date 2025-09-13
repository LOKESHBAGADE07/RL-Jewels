import React, { useMemo, useState } from 'react';
import { SectionTitle } from './SectionTitle';

interface ProjectionRow {
  month: number;
  deposit: number;
  bonus: number;
  total: number;
}

const format = (v: number) => v.toLocaleString(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

export const SavingsCalculator: React.FC = () => {
  const [monthly, setMonthly] = useState(5000);
  const [months, setMonths] = useState(12);
  const [bonusRate, setBonusRate] = useState(10); // percent annual

  const projection: ProjectionRow[] = useMemo(() => {
    const rows: ProjectionRow[] = [];
    let cumulative = 0;
    for (let m = 1; m <= months; m++) {
      cumulative += monthly;
      const annualizedMonths = months / 12;
      const bonus = m === months ? (cumulative * (bonusRate / 100) * annualizedMonths) : 0;
      const total = cumulative + bonus;
      rows.push({ month: m, deposit: cumulative, bonus, total });
    }
    return rows;
  }, [monthly, months, bonusRate]);

  const final = projection[projection.length - 1];

  return (
    <section id="savings-calculator" className="py-24 section-accent-bg">
      <div className="max-w-6xl mx-auto px-4">
        <SectionTitle title="Savings Plan Calculator" subtitle="Plan & project your future jewellery budget" />
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="space-y-8 lg:col-span-1 bg-white/70 backdrop-blur rounded-2xl p-6 border border-surface-300 shadow">
            <div>
              <label htmlFor="monthly" className="block text-sm font-medium mb-1">Monthly Deposit (INR)</label>
              <input
                id="monthly"
                type="range"
                min={1000}
                max={50000}
                step={500}
                value={monthly}
                onChange={e => setMonthly(parseInt(e.target.value))}
                className="w-full"
                aria-valuemin={1000}
                aria-valuemax={50000}
                aria-valuenow={monthly}
              />
              <div className="mt-1 text-sm font-semibold">{format(monthly)}</div>
            </div>
            <div>
              <label htmlFor="months" className="block text-sm font-medium mb-1">Duration (Months)</label>
              <input
                id="months"
                type="range"
                min={3}
                max={36}
                value={months}
                onChange={e => setMonths(parseInt(e.target.value))}
                className="w-full"
                aria-valuemin={3}
                aria-valuemax={36}
                aria-valuenow={months}
              />
              <div className="mt-1 text-sm font-semibold">{months} months</div>
            </div>
            <div>
              <label htmlFor="bonus" className="block text-sm font-medium mb-1">Annual Bonus Rate (%)</label>
              <input
                id="bonus"
                type="range"
                min={0}
                max={20}
                value={bonusRate}
                onChange={e => setBonusRate(parseInt(e.target.value))}
                className="w-full"
                aria-valuemin={0}
                aria-valuemax={20}
                aria-valuenow={bonusRate}
              />
              <div className="mt-1 text-sm font-semibold">{bonusRate}%</div>
            </div>
            {final && (
              <div className="p-5 rounded-xl bg-white border border-surface-300 shadow-inner">
                <h3 className="font-semibold mb-3 tracking-wide text-brand-red">Projection Summary</h3>
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between"><span>Total Deposited</span><span className="font-medium">{format(final.deposit)}</span></li>
                  <li className="flex justify-between"><span>Estimated Bonus</span><span className="font-medium text-brand-red">{format(final.bonus)}</span></li>
                  <li className="flex justify-between pt-2 mt-2 border-t border-surface-300"><span className="font-semibold">Projected Total</span><span className="font-semibold text-accent-gold">{format(final.total)}</span></li>
                </ul>
              </div>
            )}
            <p className="text-xs text-ink-500 leading-relaxed">Illustrative projection only. Actual plan terms may vary. Contact our team for official details.</p>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-surface-300 bg-white/80 backdrop-blur">
              <div className="max-h-[420px] overflow-auto">
                <table className="min-w-full text-sm">
                  <thead className="sticky top-0 bg-brand-red text-white">
                    <tr>
                      <th className="px-3 py-2 text-left font-medium">Month</th>
                      <th className="px-3 py-2 text-right font-medium">Deposited</th>
                      <th className="px-3 py-2 text-right font-medium">Bonus</th>
                      <th className="px-3 py-2 text-right font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projection.map(r => (
                      <tr key={r.month} className="odd:bg-white even:bg-surface-200">
                        <td className="px-3 py-1">{r.month}</td>
                        <td className="px-3 py-1 text-right">{format(r.deposit)}</td>
                        <td className="px-3 py-1 text-right text-brand-red">{r.bonus ? format(r.bonus) : '-'}</td>
                        <td className="px-3 py-1 text-right font-medium">{format(r.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
