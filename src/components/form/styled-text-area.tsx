"use client";

import { Field } from "@/components/ui/field";
import { Textarea, TextareaProps } from "@chakra-ui/react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { forwardRef, TextareaHTMLAttributes } from "react";
import { getHookFormError } from "@/utils/form";

export interface StyledTextAreaProps extends TextareaProps {
  name: string;
  placeholder: string;
  label?: string;
  registerOptions?: RegisterOptions;
  rows?: number;
}

const StyledTextArea = forwardRef<HTMLTextAreaElement, StyledTextAreaProps>(
  function StyledTextArea(props, ref) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const {
      name,
      placeholder,
      label,
      registerOptions,
      rows = 4, // Default rows
      ...rest
    } = props;

    return (
      <Field
        label={label}
        invalid={Boolean(getHookFormError(errors, name))}
        errorText={getHookFormError(errors, name)?.message}
      >
        <Textarea
          placeholder={placeholder}
          borderRadius="2xl"
          rows={rows}
          {...rest}
          {...register(name, registerOptions)}
        />
      </Field>
    );
  }
);

export default StyledTextArea;
