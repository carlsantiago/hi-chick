import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src="Dashboard.png" alt="Dashboard Icon" />
    </Box>
  );
};

export default Dashboard;
