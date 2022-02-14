import React from "react";
import { Box, Image, Text, Center, HStack } from "@chakra-ui/react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink,
} from "react-router-dom";

const Dashboard = () => {
  if (Auth.loggedIn()) {
    return (
      <div>
        <Header />
        <HStack spacing="48px">
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
            >
              <Center>
                <Image
                  pt="4"
                  w="220px"
                  src="Dashboard.png"
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
          <RouteLink to="/data">
            <Box
              w="250px"
              borderWidth="1px"
              borderRadius="lg"
              rounded="20px"
              boxShadow="sm"
              overflow="hidden"
              bg="gray.200"
              border="1px"
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
          <Box
            w="250px"
            borderWidth="1px"
            borderRadius="lg"
            rounded="20px"
            boxShadow="sm"
            overflow="hidden"
            bg="gray.200"
            border="1px"
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
          <Box
            w="250px"
            borderWidth="1px"
            borderRadius="lg"
            rounded="20px"
            boxShadow="sm"
            overflow="hidden"
            bg="gray.200"
            border="1px"
          >
            <Center>
              <Image pt="4" w="220px" src="settings.png" alt="Settings Icon" />
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
        </HStack>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Dashboard;
