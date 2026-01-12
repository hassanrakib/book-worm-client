import { decodeToken } from "@/utils/auth";
import { Container } from "@chakra-ui/react";
import { cookies } from "next/headers";

export default async function Layout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;

  // optimistic check
  const tokenPayload = decodeToken(token);

  if(!tokenPayload) {
    return 'Error: User is unauthenticated';
  }

  // render slot based on the role
  return (
    // max width of the container is 90rem or 1440px by default
    <Container p={0}>{tokenPayload.role === "admin" ? admin : user}</Container>
  );
}
