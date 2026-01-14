'use client';

import { useEffect, useRef, useState } from "react";
import { useDeveloperModeStore } from '@/store/useDeveloperModeStore';

import { getInfo as getReactInfo, ReactInfo } from './ReactInfo';
import { getInfo as getTailwindInfo, TailwindInfo } from './TailwindInfo';

export const Info = () => {

  const [reactInfo, setReactInfo] = useState<ReturnType<typeof getReactInfo>>();
  const [tailwindInfo, setTailwindInfo] = useState<ReturnType<typeof getTailwindInfo>>();

  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [rerendered, setRerendered] = useState(0);

  const selfRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const isDevModeEnabled = useDeveloperModeStore(state => state.isEnabled);
  const devMode = useDeveloperModeStore(state => state.mode);

  useEffect(() => {
    const forceRerender = () => setRerendered(prev => prev + 1);
    const handleMouseOver = (ev: MouseEvent) => {

      const target = ev.target as HTMLElement | null;

      if (!target) return;

      setReactInfo(getReactInfo(target));
      setTailwindInfo(getTailwindInfo(target));

      setShow(true);
      // the state `show` is not necessarily changed, so need to ensure rerender
      forceRerender();

      targetRef.current = target;

      target.addEventListener('mouseleave', handleMouseLeft);
    };

    const handleMouseLeft = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;

      setShow(false);
      targetRef.current = null;

      target.removeEventListener('mouseleave', handleMouseLeft);
    }

    if (isDevModeEnabled && devMode === 'react' || devMode === 'tailwind') {
      document.addEventListener('mouseover', handleMouseOver);
    } else {
      document.removeEventListener('mouseover', handleMouseOver);
    }

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isDevModeEnabled, devMode]);

  useEffect(() => {
    if (!show || selfRef.current === null || targetRef.current === null) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const selfRect = selfRef.current.getBoundingClientRect();

    const topSpace = targetRect.top;
    const placeAbove = topSpace >= selfRect.height;

    const left = targetRect.left;
    const top = placeAbove ? topSpace + window.scrollY - selfRect.height - 5 : targetRect.bottom + window.scrollY + 5;

    setPosition({ top, left });
  }, [show, rerendered])

  return (
    <div
      className="absolute p-2 font-mono text-sm bg-zinc-900 rounded-sm pointer-events-none"
      style={{
        top: position.top,
        left: position.left,
        display: show ? 'block' : 'none'
      }}
      ref={selfRef}
    >
      {reactInfo && <ReactInfo {...reactInfo} />}
      {tailwindInfo && <TailwindInfo {...tailwindInfo} />}
    </div>
  )
}
