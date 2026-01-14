import {
  Box,
  Container,
  HStack,
  Link as ChakraLink,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa6";
import { LuBookMarked } from "react-icons/lu";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Privacy", href: "#" },
  ];

  // We remove the icon from the object to keep it serializable
  // or just use IDs like we did before
  const socialLinks = [
    { id: "twitter", href: "#", label: "Twitter" },
    { id: "github", href: "#", label: "GitHub" },
    { id: "instagram", href: "#", label: "Instagram" },
  ];

  return (
    <Box
      as="footer"
      bg="white"
      borderTop="1px solid"
      borderColor="gray.100"
      mt="auto"
    >
      <Container maxW="xl" py="10" px="6">
        <VStack gap="8">
          {/* Logo & Branding */}
          <VStack gap="2">
            <HStack color="yellow.600">
              {/* Render directly instead of using <Icon as={...} /> */}
              <LuBookMarked size={24} />
              <Text
                fontSize="lg"
                fontWeight="black"
                letterSpacing="tighter"
                fontFamily="serif"
              >
                Book Worm
              </Text>
            </HStack>
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Your personal sanctuary for reading and discovery.
            </Text>
          </VStack>

          {/* Navigation Links */}
          <Stack
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "4", sm: "8" }}
            align="center"
          >
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} passHref legacyBehavior>
                <ChakraLink
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.600"
                  _hover={{ color: "yellow.600" }}
                >
                  {link.label}
                </ChakraLink>
              </Link>
            ))}
          </Stack>

          <Separator borderColor="gray.100" />

          {/* Bottom Row: Socials & Copyright */}
          <VStack gap="4" width="full">
            <HStack gap="6">
              {socialLinks.map((social) => (
                <ChakraLink
                  key={social.label}
                  href={social.href}
                  color="gray.400"
                  _hover={{ color: "gray.800" }}
                >
                  {/* Conditional rendering for socials */}
                  {social.id === "twitter" && <FaTwitter size={20} />}
                  {social.id === "github" && <FaGithub size={20} />}
                  {social.id === "instagram" && <FaInstagram size={20} />}
                </ChakraLink>
              ))}
            </HStack>

            <Text fontSize="10px" color="gray.400" fontWeight="medium">
              © {currentYear} Book Worm Inc. All rights reserved. Crafted for
              book lovers.
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Footer;
