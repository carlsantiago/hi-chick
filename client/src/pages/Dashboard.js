import React, { useState } from "react";
import { Box, Image, Text, Center, HStack } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <HStack spacing="48px">
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
          <Image pt="4" w="220px" src="Dashboard.png" alt="Dashboard Icon" />
        </Center>
        <Box p="6" as="span" textAlign="center">
          <Text
            as="h1"
            fontWeight="semibold"
            fontSize="xl"
            letterSpacing="wide"
          >
            Dashboard
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
          <Image pt="4" w="220px" src="dataentry.png" alt="Data Entry Icon" />
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
    </HStack>
  );
};

export default Dashboard;
