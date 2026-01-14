import { useEffect } from "react";

export const useDevModeReact = ({ ref, displayName }: { ref: React.RefObject<HTMLElement | null>, displayName: string }) => {
  useEffect(() => {
    ref?.current?.setAttribute('data-dev-mode-react-name', displayName);
  }, [ref, displayName]);
}