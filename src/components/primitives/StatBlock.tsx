import type { Stat } from '@/types';
import { useCountUp } from '@/hooks/useCountUp';

/**
 * DS .stat block with count-up. `started` = build reached / section revealed.
 * minInlineSize in ch + tabular-nums (DS class) = zero layout shift.
 */
export default function StatBlock({ stat, started }: { stat: Stat; started: boolean }) {
  const display = useCountUp(stat.value, started, stat.animate !== false);
  return (
    <div className={stat.win ? 'stat stat--win' : 'stat'}>
      <p className="stat__value" style={{ minInlineSize: `${stat.value.length}ch` }}>
        {display}
      </p>
      <p className="stat__label">{stat.label}</p>
      <p className="stat__source">{stat.source}</p>
    </div>
  );
}
