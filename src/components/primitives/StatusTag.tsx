import type { StatusVariant } from '@/types';
import Pill from '@/components/primitives/Pill';

/** Register-mapped status pill. `progress` (amber) = PicPay employment row ONLY. */
export default function StatusTag({ variant, children }: { variant: StatusVariant; children: string }) {
  return <Pill variant={`status-${variant}`}>{children}</Pill>;
}
