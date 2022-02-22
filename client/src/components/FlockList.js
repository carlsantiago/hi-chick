import React from "react";
import { Tbody, Td, Tr } from "@chakra-ui/react";

const FlockList = ({ flocks }) => {
  if (!flocks.length) {
    return <h3>No Flocks Yet</h3>;
  }
  console.log(flocks);
  return (
    <Tbody>
      {flocks &&
        flocks.map((flock) => (
          <Tr key={flock._id}>
            <Td>{flock.shed.location}</Td>
            <Td>{flock.breed.name}</Td>
            <Td isNumeric>{flock.age}</Td>
            <Td isNumeric>{flock.initialStock}</Td>
            <Td isNumeric>{flock.currentStock}</Td>
            <Td isNumeric>{flock.femaleCount}</Td>
            <Td isNumeric>{flock.maleCount}</Td>
            <Td textAlign="center">{flock.vaccinated ? "Yes" : "No"}</Td>
            <Td>{flock.status}</Td>
          </Tr>
        ))}
    </Tbody>
  );
};

export default FlockList;
