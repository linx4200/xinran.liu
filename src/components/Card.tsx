'use client';

import { useRef } from "react";
import { useRemoveDevModeInConditions } from '@/hooks/developer-mode/useDevMode';

type Props = React.ComponentPropsWithoutRef<'div'>;

export const Card = (props: Props & { idx?: number }) => {
  const idx =  props.idx;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useRemoveDevModeInConditions({
    condition: idx !== 0,
    ref: containerRef
  })

  return (
    <div className={`w-full bg-stone-50 rounded-md p-5 text-left ${props.className ?? ''}`} ref={containerRef} dev-mode="tailwind">
      {props.children}
    </div>
  );
};