import React from "react";
import {
  Box,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Auth from "../utils/auth";
import Moment from "react-moment";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const now = new Date();

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      direction="column"
      pos="absolute"
      top="40px"
    >
      <Link href="/">
        <Image src="./HiChickWhite.png" w="230px" />
      </Link>
      <Box w="200px" pos="absolute" right="20px" textAlign="center">
        <Text fontSize="xl" mb="10px">
          <Moment format="h:mm a">{now}</Moment>
          <br />
          <Moment format="DD/MM/YYYY">{now}</Moment>
          <br />
          Logged in as {Auth.getProfile().data.firstName}
        </Text>
        <Menu>
          <MenuButton
            as={Button}
            colorScheme="yellow"
            variant="solid"
            rightIcon={<ChevronDownIcon />}
          >
            Menu
          </MenuButton>
          <MenuList>
            <Link href="/">
              <MenuItem>Home</MenuItem>
            </Link>
            <Link href="/overview">
              <MenuItem>Farm Overview</MenuItem>
            </Link>
            <Link href="/dataentry">
              <MenuItem>Data Entry</MenuItem>
            </Link>
            <Link href="/analytics">
              <MenuItem>Analytics</MenuItem>
            </Link>
            <Link href="/settings">
              <MenuItem>Settings</MenuItem>
            </Link>
            <MenuItem>
              <Link size="sm" onClick={logout} color="teal.500">
                Logout
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default Header;
