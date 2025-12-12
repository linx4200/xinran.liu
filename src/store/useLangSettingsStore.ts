import { create } from 'zustand';

export type State = {
  lang: 'en' | 'zh-CN';
}

type Action = {
  updateLang: (lang: State['lang']) => void
}

export const useLangSettingsStore = create<State & Action>((set) => ({
  lang: 'en',
  updateLang: (lang) => { set(() => ({ lang })) },
}))
