"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { VStack, Heading, Box, Text } from "@chakra-ui/react";
import Form from "@/components/form";
import SubmitButton from "@/components/form/submit-button";
import { UseFormReset } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import StyledInput from "@/components/form/styled-input";
import { ITutorial } from "@/types/tutorial";
import { useAddTutorialMutation } from "@/redux/features/tutorial/tutorial.api";
import { tutorialValidationSchema } from "@/schemas/tutorial";

type IFormValues = Omit<ITutorial, "_id">;

const AddTutorialForm = ({
  setTutorials,
}: {
  setTutorials: React.Dispatch<React.SetStateAction<ITutorial[]>>;
}) => {
  const defaultValues: IFormValues = {
    title: "",
    url: "",
  };

  const [
    addTutorial,
    {
      isLoading: isAddingTutorial,
      error: addTutorialError,
      isSuccess: isAddTutorialSuccess,
    },
  ] = useAddTutorialMutation();

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    const result = await addTutorial(data);

    // after successful submission
    if (result.data?.data) {
      // reset the form
      reset(defaultValues);

      const newTutorial = result.data.data;

      // Update the parent state locally
      setTutorials((prev) => [newTutorial, ...prev]);
    }
  };

  return (
    <Box p="6" borderWidth="1px" borderRadius="2xl" bg="bg.panel" shadow="sm">
      <VStack align="stretch" gap="5">
        <Box>
          <Heading size="md" mb="1">
            Add Book Reveiw / Tutorial
          </Heading>
        </Box>

        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(tutorialValidationSchema),
          }}
        >
          <VStack align="stretch" gap="4">
            <StyledInput
              name="title"
              placeholder="Title of the video"
              type="text"
            />
            <StyledInput
              name="url"
              placeholder="Youtube Video Url"
              type="text"
            />

            <SubmitButton
              isServerActionLoading={isAddingTutorial}
              loadingText="Adding Tutorial..."
            >
              Add Tutorial
            </SubmitButton>
            {!isAddingTutorial && addTutorialError ? (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title={
                  isFetchBaseQueryErrorWithData(addTutorialError)
                    ? addTutorialError.data.message
                    : "There was an error processing your request"
                }
              />
            ) : null}
            {!isAddingTutorial && isAddTutorialSuccess ? (
              <Alert
                size="sm"
                variant="outline"
                status="success"
                title={"Tutorial Added Successfully."}
              />
            ) : null}
          </VStack>
        </Form>
      </VStack>
    </Box>
  );
};

export default AddTutorialForm;
