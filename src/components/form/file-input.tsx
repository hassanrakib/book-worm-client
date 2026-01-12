"use client";

import { FileUpload, Float, useFileUploadContext } from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import StyledButton from "../shared/styled-button";
import { Field } from "../ui/field";
import { getHookFormError } from "@/utils/form";

// 1. Keep your List component the same
const FileUploadList = () => {
  const fileUpload = useFileUploadContext();
  const files = fileUpload.acceptedFiles;
  if (files.length === 0) return null;
  return (
    <FileUpload.ItemGroup>
      {files.map((file) => (
        <FileUpload.Item
          w="auto"
          boxSize="20"
          p="2"
          file={file}
          key={file.name}
        >
          <FileUpload.ItemPreviewImage />
          <Float placement="top-end">
            <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
              <LuX />
            </FileUpload.ItemDeleteTrigger>
          </Float>
        </FileUpload.Item>
      ))}
    </FileUpload.ItemGroup>
  );
};

// 2. Update props to include 'control'
export interface FileInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
}

const FileInput = <T extends FieldValues>({
  label,
  name,
}: FileInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Field
      invalid={Boolean(getHookFormError(errors, name))}
      errorText={getHookFormError(errors, name)?.message}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FileUpload.Root
            name={field.name}
            accept={["image/*"]}
            maxFiles={1}
            // Update RHF state when files change
            onFileChange={(details) => field.onChange(details.acceptedFiles)}
          >
            {/* Chakra handles the actual input node */}
            <FileUpload.HiddenInput />

            <FileUpload.Trigger asChild>
              <StyledButton variant="outline" size="sm">
                <LuFileImage /> {label}
              </StyledButton>
            </FileUpload.Trigger>

            <FileUploadList />
          </FileUpload.Root>
        )}
      />
    </Field>
  );
};

export default FileInput;
