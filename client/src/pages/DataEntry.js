import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import DailyOps from "../components/DailyOps";
import {
  Box,
  VStack,
  Stack,
  Text,
  Divider,
  Table,
  Thead,
  Button,
  Tfoot,
  Th,
  TableCaption,
  Tr,
} from "@chakra-ui/react";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Events from "../components/Events";

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
              <Text> Add Event</Text>
              <Box height="380px" width="100%">
                <VStack>
                  <DailyOps />
                </VStack>
              </Box>
            </Stack>
            <Divider />
            <Table>
              <TableCaption>
                Pending <Button>Send</Button>
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Flock</Th>
                  <Th>Eggs Collected</Th>
                  <Th>Female Morts</Th>
                  <Th>Male Morts</Th>
                </Tr>
              </Thead>
              <Events />
            </Table>
          </>
        )}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default DataEntry;
