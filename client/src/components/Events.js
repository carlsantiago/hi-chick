import { React, useState, useEffect } from "react";
import { getAlldb } from "../utils/indexedDB";
import { QUERY_SHED } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { Tbody, Td, Tr } from "@chakra-ui/react";
import { useFarmContext } from "../utils/GlobalState";
import { UPDATE_LOCATION } from "../utils/actions";

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

  // const [state, dispatch] = useFarmContext();
  // const { locationId } = state;
  // const { loading, data } = useQuery(QUERY_SHED);

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_LOCATION,
  //       location: data.location,
  //     });
  //   }
  // }, [data, dispatch]);

  // function filterLocation() {
  //   return state.location.filter((shed) => shed.location._id === locationId);
  // }

  console.log(eventsArr);
  return (
    <Tbody>
      {eventsArr &&
        eventsArr.map((index) => (
          <Tr key={index.id}>
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
