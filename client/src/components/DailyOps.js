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
import { useQuery, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { ADD_DAILYOPS } from "../utils/mutations";

const DailyOps = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  const flocks = data?.flocks || [];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submitEvent] = useMutation(ADD_DAILYOPS);

  const formik = useFormik({
    initialValues: {
      flockId: "",
      eggsCollected: null,
      femaleMorts: null,
      maleMorts: null,
    },
    onSubmit: (values) => {
      if (!values.flockId) {
        console.log("NO FLOCK");
      } else {
        onClose();
      }

      try {
        const { data } = submitEvent({
          variables: {
            flockId: values.flockId,
            eggsCollected: values.eggsCollected,
            femaleMorts: values.femaleMorts,
            maleMorts: values.maleMorts,
          },
        });
      } catch (err) {
        console.error(err);
      }
      // window.location.reload();
      console.log(values);
    },
  });

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
                  <FormLabel htmlFor="flockId">Flock</FormLabel>
                  <Select
                    id="flockId"
                    name="flockId"
                    value={formik.values.flockId}
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
                    id="eggsCollected"
                    name="eggsCollected"
                    type="number"
                    value={formik.values.eggsCollected}
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
                      id="femaleMorts"
                      name="femaleMorts"
                      type="number"
                      value={formik.values.femaleMorts}
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
                      id="maleMorts"
                      name="maleMorts"
                      type="number"
                      value={formik.values.maleMorts}
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
