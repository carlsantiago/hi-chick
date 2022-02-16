import React from "react";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { useFormik } from "formik";
import { postDb } from "../utils/indexedDB";

const DailyOps = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  console.log(data);
  const flocks = data?.flocks || [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      flock: "",
      eggs: "",
      mortsFemale: "",
      mortsMale: "",
    },
    onSubmit: (values) => {
      if (!values.flock) {
        console.log("NO FLOCK");
      } else {
        onClose();
      }
      console.log(values);
    },
  });

  console.log(formik.errors);
  return (
    <>
      <Button onClick={onOpen}>Daily Operations</Button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <form onSubmit={formik.handleSubmit}>
                <FormControl isRequired>
                  <FormLabel htmlFor="flock"> Flock </FormLabel>
                  <Select
                    id="flock"
                    name="flock"
                    value={formik.values.flock}
                    onChange={formik.handleChange}
                    placeholder="Please select one"
                    size="lg"
                  >
                    {flocks &&
                      flocks.map((flock) => (
                        <option value={flock._id} key={flock._id}>
                          {flock.shed.location} - {flock.breed.name}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormLabel htmlFor="eggs"> Eggs Collected </FormLabel>
                <NumberInput min={0}>
                  <NumberInputField
                    id="eggs"
                    name="eggs"
                    value={formik.values.eggs}
                    onChange={formik.handleChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <FormLabel htmlFor="morts"> Mortality </FormLabel>

                <InputGroup>
                  <InputLeftAddon
                    fontSize="1.2em"
                    children={<FontAwesomeIcon icon={faVenus} />}
                  />

                  <NumberInput min={0} w="100%">
                    <NumberInputField
                      id="mortsFemale"
                      name="mortsFemale"
                      value={formik.values.mortsFemale}
                      onChange={formik.handleChange}
                      borderLeftRadius="0"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon
                    fontSize="1.2em"
                    children={<FontAwesomeIcon icon={faMars} />}
                  />

                  <NumberInput min={0} w="100%">
                    <NumberInputField
                      id="mortsMale"
                      name="mortsMale"
                      value={formik.values.mortsMale}
                      onChange={formik.handleChange}
                      borderLeftRadius="0"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </InputGroup>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} value="save" type="submit">
                    Save
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

export default DailyOps;
