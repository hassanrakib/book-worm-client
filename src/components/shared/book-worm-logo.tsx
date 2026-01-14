import {
  Flex,
  Icon,
  Text,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { BookOpen } from "lucide-react";
import NextLink from "next/link";
import { LuBookMarked } from "react-icons/lu";

const BookWormLogo = (props: Omit<ChakraLinkProps, "href">) => {
  return (
    <ChakraLink
      asChild
      _hover={{ textDecor: "none" }}
      _focus={{ outline: "none" }}
      display="flex"
      justifyContent="center"
      {...props}
    >
      <NextLink href="/">
        <Flex alignItems="center" cursor="pointer" color="yellow.600">
          <LuBookMarked size={24} />
          <Text
            fontSize="lg"
            fontWeight="black"
            letterSpacing="tighter"
            fontFamily="serif"
          >
            Book Worm
          </Text>
        </Flex>
      </NextLink>
    </ChakraLink>
  );
};

export default BookWormLogo;
