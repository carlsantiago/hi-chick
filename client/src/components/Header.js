import React from "react";
import {
  Box,
  Text,
  Stack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
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
    <Stack>
      <Box w="200px" pos="absolute" top="40px" right="20px">
        <Text fontSize="xl">
          <Moment format="h:mm a">{now}</Moment>
          <br />
          <Moment format="DD/MM/YYYY">{now}</Moment>
          <br />
          {Auth.getProfile().data.firstName} &nbsp;
          <Menu>
            <MenuButton
              as={Button}
              variant="outline"
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
              <MenuItem>Analytics</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>
                <Link size="sm" onClick={logout} color="teal.500">
                  Logout{" "}
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Text>
      </Box>
    </Stack>
  );
};
export default Header;
