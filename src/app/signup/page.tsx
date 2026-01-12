"use client";

import Form from "@/components/form";
import StyledInput from "@/components/form/styled-input";
import { Alert } from "@/components/ui/alert";
import { useRegisterUserMutation } from "@/redux/features/auth/auth.api";
import { userSignupSchema } from "@/schemas/auth";
import { IUser } from "@/types/user";
import { Card, Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRound, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { UseFormReset } from "react-hook-form";
import SubmitButton from "@/components/form/submit-button";
import BookWormLogo from "@/components/shared/book-worm-logo";
import { toaster } from "@/components/ui/toaster";
import FileInput from "@/components/form/file-input";

type IFormValues = Pick<IUser, "name" | "email" | "password"> & {profilePhoto: File[]};

const SignUp = () => {
  // router from next/navigation
  const router = useRouter();

  const [registerUser, { isLoading: isRegisteringUser, error: registerUserError }] =
    useRegisterUserMutation();

  // default values for the register form
  const defaultValues: IFormValues = {
    name: "",
    profilePhoto: [],
    email: "",
    password: "",
  };

  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {

    const formData = new FormData();

    // 1. Extract the file from the array
    if (data.profilePhoto && data.profilePhoto.length > 0) {
      formData.append("image", data.profilePhoto[0]);
    }

    // 2. Prepare the text data (excluding the file)
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    // 3. Append the stringified data as a text field named 'data'
    formData.append("data", JSON.stringify(userData));

    const result = await registerUser(formData);

    // after successful submission
    if (result.data?.data) {
      // reset the form
      reset(defaultValues);
      // show a ui feedback
      toaster.create({ type: "info", description: "Successfully signed up" });

      // redirect user to the signin page
      router.push("/signin");
    }
  };

  return (
    <Flex justify="center" align="center" minHeight="100vh" p={4}>
      <Card.Root maxW="sm" w="100%" borderRadius="lg" boxShadow="lg" bg="white">
        {/* show logo */}
        <BookWormLogo mt="2" />
        <Card.Header>
          <Card.Title fontSize="2xl">Create Account</Card.Title>
          <Card.Description>
            Fill in the form below to create an account
          </Card.Description>
        </Card.Header>
        <Form
          onSubmit={onSubmit}
          useFormProps={{
            defaultValues,
            resolver: zodResolver(userSignupSchema),
          }}
        >
          <Card.Body gap={3}>
            <FileInput label="Upload Photo" name="profilePhoto" />
            <StyledInput
              name="name"
              placeholder="Full Name"
              type="text"
              startElement={<UserRound size={18} />}
            />
            <StyledInput
              name="email"
              placeholder="Email"
              type="email"
              startElement={<Mail size={18} />}
            />
            <StyledInput
              name="password"
              placeholder="Password"
              type="password"
              startElement={<LockKeyhole size={18} />}
            />
          </Card.Body>
          <Card.Footer flexDir="column" alignItems="stretch">
            {!isRegisteringUser && registerUserError ? (
              <Alert
                size="sm"
                variant="outline"
                status="error"
                title="There was an error processing your request"
              />
            ) : null}
            <SubmitButton
              isServerActionLoading={isRegisteringUser}
              loadingText="Creating user..."
            >
              Sign up
            </SubmitButton>
            {/* show link to the signup page */}
            <Text fontSize="sm" mt="2" textAlign="center">
              Have an account?{" "}
              <ChakraLink variant="underline" colorPalette="yellow" asChild>
                <NextLink href="/signin">Sign in</NextLink>
              </ChakraLink>
            </Text>
          </Card.Footer>
        </Form>
      </Card.Root>
    </Flex>
  );
};

export default SignUp;
