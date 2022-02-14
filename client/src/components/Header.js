import React from "react";
import { Box, Text, Stack, Link } from "@chakra-ui/react";
import Auth from "../utils/auth";
import Moment from "react-moment";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  const now = new Date();

  console.log(Auth.getProfile().data);
  return (
    <Stack>
      <Box w="250px" pos="absolute" top="40px" right="40px">
        <Text fontSize="xl">
          <Moment format="h:mm a">{now}</Moment>
          <br />
          <Moment format="DD/MM/YYYY">{now}</Moment>
          <br />
          {Auth.getProfile().data.firstName} &nbsp;
          <Link size="sm" onClick={logout} color="teal.500">
            Logout
          </Link>
        </Text>
      </Box>
    </Stack>
  );
};
export default Header;