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
  FormControl,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { useFormik } from "formik";

const MaintenanceReq = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  const flocks = data?.flocks || [];
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formik = useFormik({
    initialValues: {
      flockId: "",
    },
  });
  return (
    <>
      <Button colorScheme="yellow" w="200px" onClick={onOpen}>
        Maintenance Request
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Submit Maintenance Request</ModalHeader>
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
    </>
  );
};

export default MaintenanceReq;
