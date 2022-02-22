import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Heading,
  Divider,
  Box,
  VStack,
  Flex,
  Link,
  Button,
  Stack,
} from "@chakra-ui/react";
import AddUser from "../components/AddUser";
import AddFlock from "../components/AddFlock";
import Footer from "../components/Footer";

const Settings = () => {
  const userAuth = Auth.getProfile().data.userType;

  if (Auth.loggedIn()) {
    return (
      <>
        {!userAuth ? (
          <Stack>
            <Heading>Unauthorised access</Heading>
            <Link href="/">
              <Button colorScheme="yellow">Go Back</Button>
            </Link>
          </Stack>
        ) : (
          <>
            <Header />
            <Flex flexDirection="column">
              <Heading as="h2" size="2xl">
                Administrative Tools
              </Heading>

              <Divider borderColor="black" mt="20px" />
              <Box heigh="300px" width="100%">
                <VStack my="40px">
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
