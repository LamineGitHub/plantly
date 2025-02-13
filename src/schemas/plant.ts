import { usePlantStore } from "@/store/plantsStore";
import { z } from "zod";

export const createPlantSchema = () => {
  const { doesPlantExist } = usePlantStore.getState();

  return z.object({
    name: z
      .string({
        invalid_type_error: "Plant name must be a string",
      })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .refine((name) => name.length > 0, "Name cannot be empty")
      .refine(
        (name) => /^[a-zA-Z\s'-][a-zA-Z0-9\s'-]*$/.test(name),
        "Name can only contain letters, spaces, hyphens and apostrophes, and cannot start with a number",
      )
      .refine(
        (name) => !doesPlantExist(name),
        "A plant with this name already exists",
      ),
    days: z
      .string({
        invalid_type_error: "Watering frequency must be a number",
      })
      .trim()
      .transform((val) => parseInt(val, 10))
      .refine((days) => days > 0, "Days must be greater than 0")
      .refine((days) => days <= 365, "Maximum watering interval is 365 days"),
  });
};

// Successful parsed data type
export type PlantFormData = z.infer<ReturnType<typeof createPlantSchema>>;
