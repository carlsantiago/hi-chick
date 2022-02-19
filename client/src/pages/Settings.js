import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import { Heading, Stack, Divider, Box, VStack } from "@chakra-ui/react";
import AddUser from "../components/AddUser";
import AddFlock from "../components/AddFlock";
const Settings = () => {
  const userAuth = Auth.getProfile().data.userType;

  if (Auth.loggedIn()) {
    return (
      <>
        {!userAuth ? (
          <Heading>Unauthorized access</Heading>
        ) : (
          <div>
            <Header />
            <Stack>
              <Heading as="h2" size="2xl">
                Administrative Tools
              </Heading>
              <Divider />
              <Box heigh="300px" width="100%">
                <VStack my="50px">
                  <AddUser />
                  <AddFlock />
                </VStack>
              </Box>
            </Stack>
          </div>
        )}
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Settings;
