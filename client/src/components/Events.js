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
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";
import EditEvent from "./EditEvent";

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
    const name = foundFlock.shed.location + " - " + foundFlock.breed.name;
    return name;
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
                  <Td textAlign="center">{index.eggsCollected}</Td>
                  <Td textAlign="center">{index.maleMorts}</Td>
                  <Td textAlign="center">{index.femaleMorts}</Td>
                  <Td>
                    <EditEvent
                      eventId={index._id}
                      id={index.flockId._id}
                      eggs={index.eggsCollected}
                      maleMorts={index.maleMorts}
                      femaleMorts={index.femaleMorts}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      ) : (
        <Text>No events</Text>
      )}
    </>
  );
};

export default Events;
