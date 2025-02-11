import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  [propName: string]: {};
};

export function PlantyRowForm({
  label,
  placeholder,
  value,
  onChange,
  ...rest
}: Props) {
  return (
    <View>
      <Text className="mb-2 font-inter text-lg">{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        className="rounded-md border border-colorLightGrey px-3 font-inter text-lg"
        {...rest}
      />
    </View>
  );
}
