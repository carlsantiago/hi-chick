import React from "react";
import { Box, Image, Text, Center, Flex } from "@chakra-ui/react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import { Link as RouteLink } from "react-router-dom";
import Footer from "../components/Footer";
const Dashboard = () => {
  if (Auth.loggedIn()) {
    return (
      <>
        <Header />
        <Flex
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          w="100vw"
          height="400px"
        >
          <RouteLink as="ReactRouter" to="/overview">
            <Box
              w="250px"
              borderWidth="1px"
              borderRadius="lg"
              rounded="20px"
              boxShadow="sm"
              overflow="hidden"
              bg="gray.200"
              border="1px"
              m="30px"
            >
              <Center>
                <Image
                  pt="4"
                  w="220px"
                  src="dashboard.png"
                  alt="Dashboard Icon"
                />
              </Center>
              <Box p="6" as="span" textAlign="center">
                <Text
                  as="h1"
                  fontWeight="semibold"
                  fontSize="xl"
                  letterSpacing="wide"
                >
                  Farm Overview
                </Text>
              </Box>
            </Box>
          </RouteLink>
          <RouteLink to="/dataentry">
            <Box
              w="250px"
              borderWidth="1px"
              borderRadius="lg"
              rounded="20px"
              boxShadow="sm"
              overflow="hidden"
              bg="gray.200"
              border="1px"
              m="30px"
            >
              <Center>
                <Image
                  pt="4"
                  w="220px"
                  src="dataentry.png"
                  alt="Data Entry Icon"
                />
              </Center>
              <Box p="6" as="span" textAlign="center">
                <Text
                  as="h1"
                  fontWeight="semibold"
                  fontSize="xl"
                  letterSpacing="wide"
                >
                  Data Entry
                </Text>
              </Box>
            </Box>
          </RouteLink>

          <RouteLink as="ReactRouter" to="/analytics">
            <Box
              w="250px"
              borderWidth="1px"
              borderRadius="lg"
              rounded="20px"
              boxShadow="sm"
              overflow="hidden"
              bg="gray.200"
              border="1px"
              m="30px"
            >
              <Center>
                <Image
                  pt="4"
                  w="220px"
                  src="analytics.png"
                  alt="Analytics Icon"
                />
              </Center>
              <Box p="6" as="span" textAlign="center">
                <Text
                  as="h1"
                  fontWeight="semibold"
                  fontSize="xl"
                  letterSpacing="wide"
                >
                  Analytics
                </Text>
              </Box>
            </Box>
          </RouteLink>
          <RouteLink as="ReactRouter" to="/settings">
            <Box
              w="250px"
              borderWidth="1px"
              borderRadius="lg"
              rounded="20px"
              boxShadow="sm"
              overflow="hidden"
              bg="gray.200"
              border="1px"
              m="30px"
            >
              <Center>
                <Image
                  pt="4"
                  w="220px"
                  src="settings.png"
                  alt="Settings Icon"
                />
              </Center>
              <Box p="6" as="span" textAlign="center">
                <Text
                  as="h1"
                  fontWeight="semibold"
                  fontSize="xl"
                  letterSpacing="wide"
                >
                  Settings
                </Text>
              </Box>
            </Box>
          </RouteLink>
        </Flex>

        <Footer />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Dashboard;
