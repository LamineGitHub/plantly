import { PlantsState } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePlantStore = create<PlantsState>()(
  persist(
    (set) => ({
      nextId: 1,
      plants: [],
      addPlant: (name, wateringFrequencyDays) => {
        set((state) => ({
          ...state,
          nextId: state.nextId + 1,
          plants: [
            {
              id: state.nextId.toString(),
              name,
              wateringFrequencyDays,
            },
            ...state.plants,
          ],
        }));
      },
      removePlant: (plantId) => {
        set((state) => ({
          ...state,
          plants: state.plants.filter((plant) => plant.id !== plantId),
        }));
      },
      waterPlant: (plantId) => {
        set((state) => ({
          ...state,
          plants: state.plants.map((plant) =>
            plant.id === plantId
              ? { ...plant, lastWateredAtTimestamp: Date.now() }
              : plant,
          ),
        }));
      },
    }),
    {
      name: "plantly-plants-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
