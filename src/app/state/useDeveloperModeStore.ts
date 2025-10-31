import { create } from 'zustand';

export type State = {
  isEnabled: boolean;
  mode: undefined | 'react' | 'tailwind' | 'nextjs';
  isHeroSectionShown: boolean;
}

type Action = {
  toggle: (status?: boolean) => void
  updateMode: (mode: State['mode']) => void
  updateHeroSectionShowStatus: (status: boolean) => void
}

export const useDeveloperModeStore = create<State & Action>((set) => ({
  isEnabled: false,
  mode: undefined,
  isHeroSectionShown: true,
  toggle: (status?: boolean) => {
    set((state) => {
      const newStatus = typeof status === 'undefined' ? !state.isEnabled : status;
      return {
        isEnabled: newStatus,
        mode: newStatus === false ? undefined : state.mode
      }
  })},
  updateMode: (mode) => {set(() => ({ mode, isEnabled: typeof mode !== 'undefined' ? true : false }))},
  updateHeroSectionShowStatus: (isHeroSectionShown) => {set(() => ({ isHeroSectionShown }))},
}))
