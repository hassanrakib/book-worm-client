"use client";

import {
  FileUpload,
  Float,
  useFileUploadContext,
  Image,
  Box,
} from "@chakra-ui/react";
import { LuFileImage, LuX } from "react-icons/lu";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import StyledButton from "../shared/styled-button";
import { Field } from "../ui/field";
import { getHookFormError } from "@/utils/form";

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

export interface FileInputProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  defaultUrl?: string; // New optional prop
}

const FileInput = <T extends FieldValues>({
  label,
  name,
  defaultUrl,
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
        render={({ field }) => {
          // Check if user has selected any new files
          const hasNewSelection = field.value && field.value.length > 0;

          return (
            <FileUpload.Root
              name={field.name}
              accept={["image/*"]}
              maxFiles={1}
              onFileChange={(details) => field.onChange(details.acceptedFiles)}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <StyledButton variant="outline" size="sm">
                  <LuFileImage /> {label}
                </StyledButton>
              </FileUpload.Trigger>

              {/* Show default image preview only if no new file is selected */}
              {!hasNewSelection && defaultUrl && (
                <Box
                  mb="2"
                  position="relative"
                  boxSize="20"
                  borderWidth="1px"
                  rounded="md"
                  overflow="hidden"
                >
                  <Image
                    src={defaultUrl}
                    alt="Default image"
                    objectFit="cover"
                    boxSize="full"
                  />
                </Box>
              )}

              <FileUploadList />
            </FileUpload.Root>
          );
        }}
      />
    </Field>
  );
};

export default FileInput;
