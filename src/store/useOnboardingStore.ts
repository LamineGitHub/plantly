import { create } from "zustand";
import { UserState } from "@/types";
import { createSelectors } from "@/store/selectors";

const useOnboardingStoreBase = create<UserState>((set) => ({
  hasFinishedOnboarding: true,
  setHasFinishedOnboarding: (value: boolean) =>
    set(() => ({
      hasFinishedOnboarding: value,
    })),
}));

export const useOnboardingStore = createSelectors(useOnboardingStoreBase);
