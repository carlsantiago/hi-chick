import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import { ADD_SHED } from "../utils/mutations";

const AddLocation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submitLocation] = useMutation(ADD_SHED);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      try {
        const { data } = submitLocation({
          variables: {
            location: values.name,
          },
        });
        onClose();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Button onClick={onOpen} mt={2} colorScheme="yellow" variant="outline">
        Click to add a location
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a location</ModalHeader>
          <ModalCloseButton />{" "}
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Location name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Shed 1"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="yellow" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLocation;
