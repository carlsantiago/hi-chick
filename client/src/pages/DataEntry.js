import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import DailyOps from "../components/DailyOps";
import { Box, VStack, Divider, Heading, Flex } from "@chakra-ui/react";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Events from "../components/Events";
import Vaccination from "../components/Vaccination";
import Weighing from "../components/Weighing";
import Footer from "../components/Footer";
const DataEntry = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);

  if (Auth.loggedIn()) {
    return (
      <>
        <Header />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Flex flexDirection="column">
            <VStack>
              <Heading as="h2" size="2xl">
                Data Entry
              </Heading>
              <Divider />
              <Box height="300px">
                <VStack my="50px">
                  <DailyOps />
                  <Vaccination />
                  <Weighing />
                </VStack>
              </Box>
            </VStack>
            <Divider />
            <Flex overflowX="auto">
              <Events />
            </Flex>
          </Flex>
        )}
        <Footer />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default DataEntry;
