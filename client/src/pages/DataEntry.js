import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import DailyOps from "../components/DailyOps";
import { Box, VStack, Stack, Divider, Heading } from "@chakra-ui/react";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Events from "../components/Events";
import Vaccination from "../components/Vaccination";
import Weighing from "../components/Weighing";

const DataEntry = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);

  if (Auth.loggedIn()) {
    return (
      <div>
        <Header />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Stack>
              <Heading as="h2" size="2xl">
                Data Entry
              </Heading>
              <Divider />
              <Box height="300px" width="100%">
                <VStack my="50px">
                  <DailyOps />
                  <Vaccination />
                  <Weighing />
                </VStack>
              </Box>
            </Stack>
            <Divider />

            <Events />
          </>
        )}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default DataEntry;
