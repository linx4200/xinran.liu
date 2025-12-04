'use client';

import { useEffect, useRef, useState } from "react";
import { useDeveloperModeStore } from '@/store/useDeveloperModeStore';

export const Info = () => {

  const [name, setName] = useState('');
  const [propList, setPropList] = useState<({ key: string, value: string }[] | undefined)>();
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const selfRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const isDevModeEnabled = useDeveloperModeStore(state => state.isEnabled);
  const devMode = useDeveloperModeStore(state => state.mode);

  useEffect(() => {
    const handleMouseOver = (ev: MouseEvent) => {

      const target = ev.target as HTMLElement | null;
      if (!target) return;

      const devAttrs = Array.from(target.attributes).filter(attr => attr.name.startsWith('data-dev-mode-react-'));
      if (!devAttrs.length) return;

      setPropList(devAttrs.filter(attr => attr.name.startsWith('data-dev-mode-react-prop-')).map(attr => ({ key: attr.name.replace('data-dev-mode-react-prop-', ''), value: attr.value })));
      setName(devAttrs.filter(attr => attr.name === 'data-dev-mode-react-name')[0].value);
      setShow(true);

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

    if (isDevModeEnabled && devMode === 'react') {
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
  }, [show])

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
      <div>
        <span className="text-slate-400">&lt;</span>
        <span className="text-rose-700/90 font-bold">{name}</span>
        {!propList || propList.length === 0 && <span className="text-slate-400">&#47;&gt;</span>}
      </div>
      <div className="text-xs/normal">
        {propList?.map(({key, value}) =>
          <div className="flex" key={key}>
            <span className="text-sky-600 indent-4">{key}</span>
            <span className="text-slate-400">=</span>
            <span className="text-orange-300/80 max-w-[300px] text-ellipsis line-clamp-1">{`"${value}`}</span>
            <span className="text-orange-300/80">{`"`}</span>
          </div>
        )}
      </div>
      {propList && propList.length > 0 && <div className="text-slate-400">&#47;&gt;</div>}
    </div>
  )
}
