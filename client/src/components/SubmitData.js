import { React, useEffect } from "react";
import { getAlldb } from "../utils/indexedDB";
import { useMutation } from "@apollo/client";
import { ADD_DAILYOPS } from "../utils/mutations";
import { Button } from "@chakra-ui/react";

const SubmitData = () => {
  const [submitData] = useMutation(ADD_DAILYOPS);

  useEffect(() => {
    async function fetchDb() {
      const result = await getAlldb();
      console.log(result);

      try {
        const { data } = await submitData({
          variables: {
            result,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchDb();
  }, [submitData]);

  return <Button>Send</Button>;
};

export default SubmitData;
