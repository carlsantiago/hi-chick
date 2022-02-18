import React from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  Button,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const AddUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = React.useState(false);

  const [submitUser] = useMutation(ADD_USER);

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
    onSubmit: (values) => {
      if (!values.username) {
        console.log("No username input");
      } else {
        onClose();
        console.log(values);
      }

      try {
        const { data } = submitUser({
          variables: {
            username: values.username,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Button colorScheme="teal" w="200px" onClick={onOpen}>
        Create an account
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4}>
            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  placeholder="Username"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>First name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder="First name"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Last name</FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  placeholder="Last name"
                />
              </FormControl>

              <ModalFooter mt={5} p={0}>
                <Button colorScheme="blue" mr={3} type="submit">
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUser;
