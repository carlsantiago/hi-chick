import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import { Heading, Divider, Box, VStack, Flex } from "@chakra-ui/react";
import AddUser from "../components/AddUser";
import AddFlock from "../components/AddFlock";
import Footer from "../components/Footer";

const Settings = () => {
  const userAuth = Auth.getProfile().data.userType;

  if (Auth.loggedIn()) {
    return (
      <>
        {!userAuth ? (
          <Heading>Unauthorized access</Heading>
        ) : (
          <>
            <Header />
            <Flex flexDirection="column">
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
            </Flex>
            <Footer />
          </>
        )}
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Settings;
