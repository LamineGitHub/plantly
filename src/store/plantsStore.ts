import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { PlantsState } from "@/types";
import * as FileSystem from "expo-file-system";

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
      addPlant: async (name, wateringFrequencyDays, imageUri) => {
        const savedImageUri =
          FileSystem.documentDirectory +
          `${new Date().getTime()}-${imageUri?.split("/").at(-1)}`;

        if (imageUri) {
          await FileSystem.copyAsync({
            from: imageUri,
            to: savedImageUri,
          });
        }

        return set((state) => ({
          ...state,
          nextId: state.nextId + 1,
          plants: [
            {
              id: state.nextId.toString(),
              name,
              wateringFrequencyDays,
              imageUri: imageUri ? savedImageUri : undefined,
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
