import { React, useState, useEffect } from "react";
import { getAlldb } from "../utils/indexedDB";
import { QUERY_SHED } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Tbody, Td, Tr } from "@chakra-ui/react";

const Events = () => {
  const [eventsArr, setArray] = useState([]);

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

  return (
    <Tbody>
      {eventsArr &&
        eventsArr.map((index) => (
          <Tr>
            <Td>Shed</Td>
            <Td>Breed</Td>
            <Td>{index.event.eggs}</Td>
            <Td>{index.event.mortsMale}</Td>
            <Td>{index.event.mortsFemale}</Td>
          </Tr>
        ))}
    </Tbody>
  );
};

export default Events;
