import { createContext, useContext } from "react";

const MemberContext = createContext(null);

export const MemberProvider = MemberContext.Provider;

export function useMember() {
  const member = useContext(MemberContext);

  if (!member) {
    throw new Error("useMember must be used inside an active member route.");
  }

  return member;
}
