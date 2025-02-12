// Form Types
export type FormFieldProps = {
  label: string;
  placeholder: string;
  error?: {
    message?: string;
  };
  [key: string]: any;
};

// Plant Types
export type PlantType = {
  id: string;
  name: string;
  wateringFrequencyDays: number;
  lastWateredAtTimestamp?: number;
  imageUri?: string;
};

// Store Types
export type UserState = {
  hasFinishedOnboarding: boolean;
  setHasFinishedOnboarding: (value: boolean) => void;
};

export type PlantsState = {
  nextId: number;
  plants: PlantType[];
  doesPlantExist: (name: string) => boolean;
  addPlant: (
    name: string,
    wateringFrequencyDays: number,
    imageUri?: string,
  ) => Promise<void>;
  removePlant: (plantId: string) => void;
  resetPlants: () => void;
  waterPlant: (plantId: string) => void;
};
