import { FormFieldProps } from "@/types";
import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type Props = FormFieldProps &
  Partial<ControllerRenderProps<FieldValues, string>>;

export function PlantyRowForm({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  ...rest
}: Props) {
  return (
    <View>
      <Text className="mb-2 font-inter text-lg">{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        onBlur={onBlur}
        className={`rounded-md border p-3 font-inter text-lg ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {error?.message && (
        <Text className="mt-2 font-inter-italic text-sm text-red-500">
          {error.message}
        </Text>
      )}
    </View>
  );
}
