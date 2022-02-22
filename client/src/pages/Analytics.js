import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import {
  Heading,
  Flex,
  Divider,
  Box,
  Text,
  Select,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Spinner,
} from "@chakra-ui/react";

import * as XLSX from "xlsx";

const Analytics = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  const flocks = data?.flocks || [];
  console.log(flocks);

  const saveAs = () => {
    const workbook = XLSX.utils.book_new();
    workbook.SheetNames.push("HiChick");

    var ws = workbook.Sheets["Sheet1"];
    XLSX.utils.sheet_add_aoa(ws, [["Created " + new Date().toISOString()]], {
      origin: -1,
    });
    XLSX.writeFile(workbook, "Report.xlsb");
  };

  if (Auth.loggedIn()) {
    return (
      <>
        <Header />

        {loading ? (
          <Spinner size="xl" />
        ) : (
          <Flex flexDirection="column">
            <Heading as="h2" size="xl" mb="10px">
              Production Data Report
            </Heading>
            <Divider borderColor="black" mb="20px" />
            <Box>
              <HStack>
                <Text>Flock:</Text>
                <Select
                  placeholder="Select option"
                  width="200px"
                  borderColor="black"
                >
                  {flocks &&
                    flocks.map((flock) => (
                      <option value={flock._id} key={flock._id}>
                        {flock.shed.location} - {flock.breed.name}
                      </option>
                    ))}
                </Select>
              </HStack>
              <HStack>
                <Text mr="10px" my="30px">
                  Last:
                </Text>
                <NumberInput
                  defaultValue={1}
                  min={1}
                  max={99}
                  width="100px"
                  borderColor="black"
                >
                  <NumberInputField />
                  <NumberInputStepper borderColor="black">
                    <NumberIncrementStepper borderColor="black" />
                    <NumberDecrementStepper borderColor="black" />
                  </NumberInputStepper>
                </NumberInput>
                <Text>Week(s)</Text>
              </HStack>
              <Button colorScheme="yellow" onClick={saveAs}>
                Run Report
              </Button>
            </Box>
          </Flex>
        )}
        <Footer />
      </>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Analytics;
