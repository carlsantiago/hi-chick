import { React, useState, useEffect } from "react";
import { getAlldb } from "../utils/indexedDB";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import {
  Tbody,
  Td,
  Tr,
  Table,
  Thead,
  Button,
  Th,
  TableCaption,
  Text,
} from "@chakra-ui/react";

const Events = () => {
  const [eventsArr, setArray] = useState([]);

  const { loading, data } = useQuery(QUERY_FLOCKS);
  const flocks = data?.flocks || [];

  useEffect(() => {
    async function fetchData() {
      const result = await getAlldb();
      let tempArr = [];
      for (let data of result) {
        tempArr.push(data);
      }
      setArray(tempArr);
    }
    fetchData();
  }, []);

  const getName = (id) => {
    const foundFlock = flocks.find((flock) => {
      return flock._id === id;
    });

    return foundFlock.shed.location + " - " + foundFlock.breed.name;
  };

  console.log(eventsArr);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <>
      {eventsArr.length ? (
        <Table>
          <TableCaption>
            {eventsArr.length} Pending <Button type="submit">Send</Button>
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Flock</Th>
              <Th>Eggs Collected</Th>
              <Th>Female Morts</Th>
              <Th>Male Morts</Th>
            </Tr>
          </Thead>
          <Tbody>
            {eventsArr &&
              eventsArr.map((index) => (
                <Tr key={index.id}>
                  <Td>{getName(index.event.flock)}</Td>
                  <Td>{index.event.eggs}</Td>
                  <Td>{index.event.mortsMale}</Td>
                  <Td>{index.event.mortsFemale}</Td>
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
