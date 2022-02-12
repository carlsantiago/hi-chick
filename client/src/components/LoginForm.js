import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Button,
  FormControl,
} from "@chakra-ui/react";

import { LockIcon, InfoIcon } from "@chakra-ui/icons";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      {data ? (
        <p>
          Success! You may now head <Link to="/"> back to the hompage.</Link>
        </p>
      ) : (
        <form action="submit" onSubmit={handleFormSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<InfoIcon />} />
                <Input
                  variant="outline"
                  type="name"
                  placeholder="Username"
                  aria-label="Username"
                  bg="white"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement children={<LockIcon />} />
                <Input
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  bg="white"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <Button type="submit" variant="solid" colorScheme="blue">
              Log in
            </Button>
          </Stack>
        </form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default LoginForm;
