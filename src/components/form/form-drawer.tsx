import { ButtonGroup, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { ReactElement } from "react";
import Form, { IFormProps } from "@/components/form";
import { FieldValues } from "react-hook-form";
import SubmitButton from "./submit-button";
import StyledButton from "../shared/styled-button";
import { isFetchBaseQueryErrorWithData } from "@/redux/helpers";
import { Alert } from "../ui/alert";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface FormDrawerProps<FormValues extends FieldValues>
  extends Drawer.RootProps,
    IFormProps<FormValues> {
  title: string;
  isOpen: boolean;
  handleClose: () => void;
  isLoading: boolean;
  submitError: FetchBaseQueryError | SerializedError | undefined;
}

export default function FormDrawer<FormValues extends FieldValues>(
  props: FormDrawerProps<FormValues>
) {
  const {
    title,
    onSubmit,
    useFormProps,
    isOpen,
    handleClose,
    isLoading,
    children,
    submitError,
    ...rest
  } = props;

  return (
    <Drawer.Root open={isOpen} size="md" onInteractOutside={handleClose} {...rest}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Form onSubmit={onSubmit} useFormProps={useFormProps}>
              <Drawer.Header>
                <Drawer.CloseTrigger asChild pos="initial">
                  <CloseButton onClick={handleClose} />
                </Drawer.CloseTrigger>
                <Drawer.Title flex="1">{title}</Drawer.Title>
                <ButtonGroup>
                  <StyledButton variant="outline" onClick={handleClose}>
                    Cancel
                  </StyledButton>
                  <SubmitButton isServerActionLoading={isLoading}>
                    Save
                  </SubmitButton>
                </ButtonGroup>
              </Drawer.Header>
              <Drawer.Body>
                {!isLoading && submitError ? (
                  <Alert
                    size="sm"
                    variant="outline"
                    status="error"
                    title={
                      isFetchBaseQueryErrorWithData(submitError)
                        ? submitError.data.message
                        : "There was an error processing your request"
                    }
                  />
                ) : null}
                {/* form inputs go here */}
                {children}
              </Drawer.Body>
            </Form>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
