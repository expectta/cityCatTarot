import { useMemo } from "react";
import { createPortal } from "react-dom";

type IpotalProps = {
  children: JSX.Element | JSX.Element[];
  elementId: string;
};
export default function Portal({ children, elementId }: IpotalProps) {
  const rootElement = useMemo(() => document.getElementById(elementId), [
    elementId,
  ])!;
  return createPortal(children, rootElement);
}
