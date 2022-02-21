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
  Spinner,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { UPDATE_FLOCK } from "../utils/mutations";
import { EditIcon } from "@chakra-ui/icons";
import { UPDATE_EVENT } from "../utils/mutations";

const EditEvent = ({ id, eggs, maleMorts, femaleMorts, eventId }) => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  const flocks = data?.flocks || [];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateFlock] = useMutation(UPDATE_FLOCK);
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const fetchFlock = (morts, id, female, male) => {
    const foundFlock = flocks.find((flock) => {
      return flock._id === id;
    });

    console.log(foundFlock);
    const newCurrentStock = foundFlock.currentStock - morts;
    const newFemaleCount = foundFlock.femaleCount - female;
    const newMaleCount = foundFlock.maleCount - male;
    console.log(newCurrentStock, newFemaleCount, newMaleCount);
    return { newCurrentStock, newFemaleCount, newMaleCount };
  };

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
      const totalMorts = values.femaleMorts + values.maleMorts;

      let updatedValues = fetchFlock(
        totalMorts,
        values.flockId,
        values.femaleMorts,
        values.maleMorts
      );
      console.log(updatedValues);
      try {
        const { data } = updateEvent({
          variables: {
            _id: eventId,
            flockId: values.flockId,
            eggsCollected: values.eggsCollected,
            femaleMorts: values.femaleMorts,
            maleMorts: values.maleMorts,
          },
        });

        const { data1 } = updateFlock({
          variables: {
            _id: values.flockId,
            femaleCount: updatedValues.newFemaleCount,
            maleCount: updatedValues.newMaleCount,
            currentStock: updatedValues.newCurrentStock,
          },
        });
      } catch (err) {
        console.error(err);
      }
      window.location.reload();
    },
  });

  return (
    <>
      <Button onClick={onOpen}>
        <EditIcon />
      </Button>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Event</ModalHeader>
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
                    placeholder="Select one"
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
                    placeholder={eggs}
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
                      placeholder={femaleMorts}
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

                <InputGroup mt="10px">
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
                      placeholder={maleMorts}
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
                  <Button
                    colorScheme="yellow"
                    mr={3}
                    value="save"
                    type="submit"
                  >
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

export default EditEvent;
