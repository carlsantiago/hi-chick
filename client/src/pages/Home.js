import React from "react";
import Auth from "../utils/auth";
import LoginForm from "../components/LoginForm";
import { Box, Image } from "@chakra-ui/react";
import { Redirect } from "react-router-dom";
import Footer from "../components/Footer";
const Home = () => {
  if (Auth.loggedIn()) {
    return <Redirect to="/Dashboard" />;
  }
  return (
    <>
      <Box backgroundImage="url('./bg.png')">
        <Box
          w="350px"
          p="3"
          boxShadow="sm"
          borderWidth="1px"
          border="2px"
          rounded="lg"
          overflow="hidden"
        >
          <Image src="./HiChick.png" w="250px" mx="auto" my="6" />
          <LoginForm />
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Home;
