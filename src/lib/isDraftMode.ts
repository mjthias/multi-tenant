import { draftMode } from "next/headers";

export function isDraftMode(): boolean {
  let isDraftMode = false;
  try {
    isDraftMode = draftMode()?.isEnabled;
  } catch {}
  return isDraftMode;
}
