import React from "react";
import Auth from "../utils/auth";
import LoginForm from "../components/LoginForm";
import { Box, Image } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";

const Home = () => {
  if (Auth.loggedIn()) {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <Box
      bg="gray.300"
      w="350px"
      p="3"
      boxShadow="sm"
      rounded="lg"
      overflow="hidden"
    >
      <Image src="./HiChickHD.png" w="250px" mx="auto" my="6" />
      <LoginForm />
    </Box>
  );
};

export default Home;
