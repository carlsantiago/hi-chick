import {
  ButtonGroup,
  Container,
  IconButton,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { EmailIcon } from "@chakra-ui/icons";

export const Footer = () => (
  <Flex
    bg="white"
    width="100%"
    justifyContent="center"
    alignItems="center"
    direction="column"
    boxShadow="0 -1px 6px -1px rgba(0, 0, 0, 0.1)"
    padding={4}
    pos="fixed"
    bottom="0px"
    height="10vh"
  >
    <Stack width="100%" justify="center" direction="row" align="center">
      <Text fontSize="16px" color="subtle">
        ©{new Date().getFullYear()} - HiChick. All rights reserved.
      </Text>
    </Stack>
    <ButtonGroup variant="ghost">
      <IconButton
        as="a"
        href="#"
        aria-label="LinkedIn"
        icon={<FaLinkedin fontSize="1.25rem" />}
      />
      <IconButton
        as="a"
        href="#"
        aria-label="GitHub"
        icon={<FaGithub fontSize="1.25rem" />}
      />
      <IconButton
        as="a"
        href="#"
        aria-label="Twitter"
        icon={<EmailIcon fontSize="1.25rem" />}
      />
    </ButtonGroup>
  </Flex>
);

export default Footer;
