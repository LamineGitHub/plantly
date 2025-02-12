import { UserState } from "@/types";
import { create } from "zustand";

export const useUserStore = create<UserState>((set) => ({
  hasFinishedOnboarding: true,
  setHasFinishedOnboarding: (value: boolean) =>
    set(() => ({
      hasFinishedOnboarding: value,
    })),
}));
