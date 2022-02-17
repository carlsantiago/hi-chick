import { React, useState, useEffect } from "react";
import { getAlldb } from "../utils/indexedDB";
import { QUERY_SINGLE_FLOCK } from "../utils/queries";
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
  // const { data: flockData } = useQuery(QUERY_SINGLE_FLOCK);

  // useEffect(() => {
  //   if (data) {
  //     dispatch({
  //       type: UPDATE_LOCATION,
  //       location: data.location,
  //     });
  //   }
  // }, [data, dispatch]);

  // const fetchLocation = (id) => {
  //   dispatch({
  //     type: UPDATE_LOCATION,
  //     flockData: id
  //   })
  // }

  // fetchLocation("")

  console.log(eventsArr);
  return (
    <Tbody>
      {eventsArr.length ? (
        eventsArr &&
        eventsArr.map((index) => (
          <Tr key={index.id}>
            <Td>{index.event.flock}</Td>
            <Td>{index.event.eggs}</Td>
            <Td>{index.event.mortsMale}</Td>
            <Td>{index.event.mortsFemale}</Td>
          </Tr>
        ))
      ) : (
        <h3>No events</h3>
      )}
    </Tbody>
  );
};

export default Events;
