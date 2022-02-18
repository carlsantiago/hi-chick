import { React, useEffect, useState } from "react";
import { getAlldb } from "../utils/indexedDB";
import { useMutation } from "@apollo/client";
import { ADD_DAILYOPS } from "../utils/mutations";
import { Button } from "@chakra-ui/react";

const SubmitData = () => {
  return <Button>Send</Button>;
};

export default SubmitData;
