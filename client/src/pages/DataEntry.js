import React from "react";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import DailyOps from "../components/DailyOps";
import {
  Box,
  Button,
  VStack,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { postDb } from "../utils/indexedDB";

const DataEntry = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  console.log(data);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (Auth.loggedIn()) {
    return (
      <div>
        <Header />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Stack>
            <Text> Add Event</Text>
            <Box height="380px" width="100%">
              <VStack>
                <Button onClick={onOpen}>Daily Operations</Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <DailyOps />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} type="submit">
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button width="100%" onClick={onOpen}>
                  Vaccination
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <DailyOps />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button width="100%" onClick={onOpen}>
                  Weighing
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Add Event</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <DailyOps />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </Box>
          </Stack>
        )}
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default DataEntry;
