import React from "react";
import { useFormik } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_FLOCK } from "../utils/mutations";
import { QUERY_SHEDS, QUERY_BREEDS } from "../utils/queries";
import {
  FormControl,
  FormLabel,
  Button,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  InputGroup,
  Input,
  InputRightAddon,
} from "@chakra-ui/react";

const AddFlock = () => {
  const { loading, data } = useQuery(QUERY_SHEDS);
  const sheds = data?.shed || [];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loading: breedLoading, data: breedData } = useQuery(QUERY_BREEDS);
  const breeds = breedData?.breed || [];

  const [submitFlock] = useMutation(ADD_FLOCK);

  const formik = useFormik({
    initialValues: {
      location: "",
      breed: "",
      age: null,
      femaleCount: null,
      maleCount: null,
    },
    onSubmit: (values) => {
      const newInitialStock = values.femaleCount + values.maleCount;
      const newCurrentStock = values.femaleCount + values.maleCount;
      console.log(values, newInitialStock, newCurrentStock);
      try {
        const { data } = submitFlock({
          variables: {
            shed: values.location,
            breed: values.breed,
            age: values.age,
            femaleCount: values.femaleCount,
            maleCount: values.maleCount,
            initialStock: newInitialStock,
            currentStock: newCurrentStock,
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
      <Button colorScheme="teal" w="200px" onClick={onOpen}>
        Add a flock
      </Button>
      {loading && breedLoading ? (
        <div>Loading...</div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add a flock</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={4}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel>Location</FormLabel>

                  <Select
                    id="location"
                    name="location"
                    type="text"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    size="lg"
                  >
                    {sheds &&
                      sheds.map((shed) => (
                        <option value={shed._id} key={shed._id}>
                          {shed.location}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel>Breed</FormLabel>
                  <Select
                    id="breed"
                    name="breed"
                    type="text"
                    value={formik.values.breed}
                    onChange={formik.handleChange}
                    size="lg"
                  >
                    {breeds &&
                      breeds.map((breed) => (
                        <option value={breed._id} key={breed._id}>
                          {breed.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Age</FormLabel>
                  <InputGroup size="sm">
                    <NumberInput
                      defaultValue={0}
                      min={0}
                      clampValueOnBlur={false}
                    >
                      <NumberInputField
                        id="age"
                        name="age"
                        type="number"
                        value={formik.values.age}
                        onChange={formik.handleChange}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <InputRightAddon children="weeks" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Female Count</FormLabel>
                  <NumberInput
                    defaultValue={0}
                    min={0}
                    clampValueOnBlur={false}
                  >
                    <NumberInputField
                      id="femaleCount"
                      name="femaleCount"
                      type="number"
                      value={formik.values.femaleCount}
                      onChange={formik.handleChange}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel>Male Count</FormLabel>
                  <NumberInput
                    defaultValue={0}
                    min={0}
                    clampValueOnBlur={false}
                  >
                    <NumberInputField
                      id="maleCount"
                      name="maleCount"
                      type="number"
                      value={formik.values.maleCount}
                      onChange={formik.handleChange}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
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
      )}
    </>
  );
};

export default AddFlock;
