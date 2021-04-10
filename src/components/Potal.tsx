import { useMemo } from "react";
import { createPortal } from "react-dom";

type PotalProps = {
  children: any;
  elementId: string;
};
export default function Portal({ children, elementId }: PotalProps) {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ])!;

  return createPortal(children, rootElement);
}
