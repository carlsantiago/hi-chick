import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Table,
  Thead,
  Tr,
  Th,
  TableCaption,
  Heading,
  Box,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_FLOCKS } from "../utils/queries";
import FlockList from "../components/FlockList";
import Footer from "../components/Footer";

const Overview = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  console.log(data);
  const flocks = data?.flocks || [];

  if (Auth.loggedIn()) {
    return (
      <>
        <Header />

        {loading ? (
          <div>Loading...</div>
        ) : (
          <Flex flexDirection="column" overflowX="auto">
            <Heading as="h2" size="2xl" mb="10px">
              Farm Overview
            </Heading>

            <Divider />
            <Box>
              <Table variant="striped" colorScheme="yellow" size="md">
                <TableCaption>Active Flocks</TableCaption>

                <Thead>
                  <Tr>
                    <Th>Shed</Th>
                    <Th>Breed</Th>
                    <Th isNumeric>Age</Th>
                    <Th isNumeric>Initial Stock</Th>
                    <Th isNumeric>Current Stock</Th>
                    <Th isNumeric>Females</Th>
                    <Th isNumeric>Males</Th>
                    <Th>Vaccinated</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>
                <FlockList flocks={flocks} />
              </Table>
            </Box>
          </Flex>
        )}
        <Footer />
      </>
    );
  } else {
    <Redirect to="/" />;
  }
};

export default Overview;
