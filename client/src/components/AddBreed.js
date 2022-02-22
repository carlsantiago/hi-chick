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
import { ADD_BREED } from "../utils/mutations";

const AddBreed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submitBreed] = useMutation(ADD_BREED);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      try {
        const { data } = submitBreed({
          variables: {
            name: values.name,
          },
        });
        onClose();
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Button onClick={onOpen} mt={2} colorScheme="yellow" variant="outline">
        Click to add a breed
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a breed</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Breed name</FormLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Cobb 58"
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

export default AddBreed;
