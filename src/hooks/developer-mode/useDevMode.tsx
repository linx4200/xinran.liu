import { useEffect, type RefObject } from "react";

type Params = {
  condition: boolean | (() => boolean)
  ref: RefObject<HTMLElement | null>
}

export const useRemoveDevModeInConditions = ({ condition, ref }: Params) => {
  useEffect(() => {
    const res = typeof condition === 'boolean' ? condition : condition();
    if (res && ref.current !== null) {
        ref.current.className = ref.current.className.replace('dev-mode-container', '');
    }
  }, [condition, ref]);
}