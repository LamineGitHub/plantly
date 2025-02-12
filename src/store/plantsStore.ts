import { PlantsState } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const usePlantStore = create<PlantsState>()(
  persist(
    (set, get) => ({
      nextId: 1,
      plants: [],
      doesPlantExist: (name: string) => {
        const state = get();
        return state.plants.some(
          (plant) => plant.name.toLowerCase() === name.toLowerCase(),
        );
      },
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
      resetPlants: () => {
        set(() => ({
          nextId: 1,
          plants: [],
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
