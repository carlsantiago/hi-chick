import { React, useState } from "react";

import { getAlldb } from "../utils/indexedDB";

import { Tbody, Td, Tr } from "@chakra-ui/react";
const Events = () => {
  const [eventsArr, setArray] = useState([]);

  const fetchDb = async () => {
    const result = await getAlldb();
    let tempArr = [];
    for (let data of result) {
      tempArr.push(data);
    }
    setArray(tempArr);
  };
  fetchDb();
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
