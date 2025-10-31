"use client";

import { useCallback } from "react";
import { useDeveloperModeStore, type State as DeveloperState } from '@/app/state/useDeveloperModeStore';

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

  return (
    <div className="fixed right-5 bottom-5">
      <button
        type="button"
        className="
          flex items-center gap-2 rounded-full border border-stone-200/80 bg-white/70 px-3.5 py-2 text-sm font-medium text-stone-700
          cursor-pointer
          transition-all duration-200 ease-out backdrop-blur-sm shadow-sm
          hover:border-stone-300 hover:bg-white/85 hover:text-stone-900
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
