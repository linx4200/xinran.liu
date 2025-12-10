"use client";

import { useCallback, useEffect } from "react";
import { useDeveloperModeStore, type State as DeveloperState } from '@/store/useDeveloperModeStore';

const STATES = [
  { key: "dev", label: "Developer Mode" },
  { key: "react", label: "React" },
  { key: "tailwind", label: "Tailwind CSS" },
  { key: "nextjs", label: "Next.js" },
] as const;

const storeState2Index = (isEnabled: boolean, mode: DeveloperState['mode']) => {
  if (!isEnabled) {
    return 0;
  }
  if (mode) {
    return STATES.findIndex(state => state.key === mode);
  }
  return 0;
}

export const FloatingToggle = () => {

  const isEnabled = useDeveloperModeStore(state => state.isEnabled);
  const setIsEnabled = useDeveloperModeStore(state => state.toggle);
  const mode = useDeveloperModeStore(state => state.mode);
  const setMode = useDeveloperModeStore(state => state.updateMode);

  const index = storeState2Index(isEnabled, mode);
  const current = STATES[index];
  const nextLabel = STATES[(index + 1) % STATES.length].label;

  const handleClick = useCallback(() => {
    const next = (index + 1) % STATES.length;
    if (next === 0) {
      setIsEnabled(false);
    } else {
      setMode(STATES[next].key as Exclude<(typeof STATES)[number]['key'], 'dev'>);
    }
  }, [index, setIsEnabled, setMode]);

  useEffect(() => {
    if (typeof mode === 'undefined') {
      document.querySelector('html')?.removeAttribute('data-dev-mode');
    } else {
      document.querySelector('html')?.setAttribute('data-dev-mode', mode);
    }
  }, [mode]);

  // todo: responsive design: 最宽的时候放在内容的右边，而不是靠屏幕右边
  return (
    <div className="fixed right-5 bottom-5">
      <button
        type="button"
        className="
          flex items-center gap-2 rounded-full px-3.5 py-2
          border border-stone-200/80 dark:border-stone-700/80 dark:bg-stone-800/70
          hover:border-stone-300 dark:hover:border-stone-600 dark:hover:bg-stone-800/85
          text-sm font-medium text-stone-700 dark:text-stone-300
          hover:text-stone-900 dark:hover:text-stone-100
          cursor-pointer
          transition-all duration-200 ease-out backdrop-blur-sm shadow-sm
        "
        onClick={handleClick}
        aria-label={`Switch to ${nextLabel}`}
        title={`Next: ${nextLabel}`}
      >
        <span className="text-xl leading-none">🏗️</span>
        <span>{current.label}</span>
      </button>
    </div>
  );
};
