"use client";

import Form from "@/components/form";
import StyledInput from "@/components/form/styled-input";
import SubmitButton from "@/components/form/submit-button";
import { Alert } from "@/components/ui/alert";
import { toaster } from "@/components/ui/toaster";
import { revalidateCacheByTag } from "@/lib/revalidate-cache-apis";
import { useCreateCategoryMutation } from "@/redux/features/category/category.api";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { categorySchema } from "@/schemas/category";
import { ICategory } from "@/types/category";
import { Card, HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";

type IFormValues = Pick<ICategory, 'name'>;

export default function CreateCategoryForm() {
  // form default value
  const defaultValues: IFormValues = {
    name: "",
  };

  //   next.js router
  const router = useRouter();

  const [
    createCategory,
    {
      isLoading: isCreatingCategory,
      error: createCategoryError,
    },
  ] = useCreateCategoryMutation();

  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const result = await createCategory(data);

    if (result.data?.data) {
      // show a ui feedback
      toaster.create({ type: "info", description: "Category Added" });

      // reset the form
      reset(defaultValues);

      // invalidate the cache
      revalidateCacheByTag("categories");
    }
  };

  return (
    <Card.Root>
      {/* form */}
      <Form
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues,
          resolver: zodResolver(categorySchema),
        }}
      >
        <Card.Body px={{ base: "2", sm: "3" }} gap="2">
          <HStack gap="3" alignItems="flex-start">
            {/* input for name */}
            <StyledInput
              type="text"
              size="sm"
              name="name"
              placeholder="Category Name"
            />
            <SubmitButton size="sm" isServerActionLoading={false}>
              Create
            </SubmitButton>
          </HStack>
        </Card.Body>
        <Card.Footer flexDir="column" alignItems="stretch">
          {!isCreatingCategory && createCategoryError ? (
            <Alert
              size="sm"
              variant="outline"
              status="error"
              title={
                isFetchBaseQueryErrorWithData(createCategoryError)
                  ? createCategoryError.data.message
                  : "There was an error processing your request"
              }
            />
          ) : null}
        </Card.Footer>
      </Form>
    </Card.Root>
  );
}
