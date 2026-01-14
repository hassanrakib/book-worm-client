"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RatingGroup } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { getHookFormError } from "@/utils/form";

export interface StyledRatingProps extends RatingGroup.RootProps {
  name: string;
  label?: string;
  count?: number;
}

const StyledRating = (props: StyledRatingProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { name, label, count = 5, ...rest } = props;

  return (
    <Field
      label={label}
      invalid={Boolean(getHookFormError(errors, name))}
      errorText={getHookFormError(errors, name)?.message}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <RatingGroup.Root
            name={field.name}
            value={field.value}
            count={count}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
            // Standardizing the color and size for your app's theme
            colorPalette="yellow"
            size="md"
            {...rest}
          >
            <RatingGroup.HiddenInput onBlur={field.onBlur} />
            <RatingGroup.Control />
          </RatingGroup.Root>
        )}
      />
    </Field>
  );
};

export default StyledRating;
