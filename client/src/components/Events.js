import { React } from "react";
import { QUERY_FLOCKS, QUERY_DAILYOPS } from "../utils/queries";
import { useQuery } from "@apollo/client";

import {
  Tbody,
  Td,
  Tr,
  Table,
  Thead,
  Th,
  TableCaption,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import { EditIcon } from "@chakra-ui/icons";

const Events = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  const flocks = data?.flocks || [];
  console.log(flocks);
  const { loading: dailyOpsLoading, data: dailyOpsData } =
    useQuery(QUERY_DAILYOPS);
  const dailyOps = dailyOpsData?.dailyOps || [];
  console.log(dailyOps);

  const getName = (id) => {
    console.log(id);
    const foundFlock = flocks.find((flock) => {
      return flock._id === id;
    });

    return foundFlock.shed.location + " - " + foundFlock.breed.name;
  };

  if (loading || dailyOpsLoading) {
    return <Spinner size="xl" />;
  }
  return (
    <>
      {dailyOps.length ? (
        <Table colorScheme="black">
          <TableCaption>Recent Events</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Flock</Th>
              <Th>Eggs Collected</Th>
              <Th>Female Morts</Th>
              <Th>Male Morts</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dailyOps &&
              dailyOps.slice(0, 3).map((index) => (
                <Tr key={index._id}>
                  <Td>{moment(index.date).format("DD-MM-YY")}</Td>
                  <Td>{getName(index.flockId._id)}</Td>
                  <Td>{index.eggsCollected}</Td>
                  <Td>{index.maleMorts}</Td>
                  <Td>{index.femaleMorts}</Td>
                  <Td>
                    <Button variant="ghost">
                      <EditIcon />
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No pending events</Text>
      )}
    </>
  );
};

export default Events;
