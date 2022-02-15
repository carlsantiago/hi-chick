import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import { Table, Thead, Tfoot, Tr, Th, TableCaption } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { QUERY_FLOCKS } from "../utils/queries";
import FlockList from "../components/FlockList";

const Overview = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  console.log(data);
  const flocks = data?.flocks || [];

  if (Auth.loggedIn()) {
    return (
      <div>
        <Header />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table variant="striped" colorScheme="teal">
            <TableCaption>Farm Overview</TableCaption>
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

            <Tfoot></Tfoot>
          </Table>
        )}
      </div>
    );
  } else {
    <Redirect to="/" />;
  }
};

export default Overview;
