import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import { QUERY_FLOCKS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const DailyOps = () => {
  const { loading, data } = useQuery(QUERY_FLOCKS);
  console.log(data);
  const flocks = data?.flocks || [];
  return (
    <Stack spacing="3">
      <FormControl isRequired>
        <FormLabel htmlFor="flock"> Flock </FormLabel>
        <Select id="flock" placeholder="Please select one" size="lg">
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
        <NumberInputField id="eggs" />
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
          <NumberInputField id="mortsFemale" borderLeftRadius="0" />
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
          <NumberInputField id="mortsMale" borderLeftRadius="0" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </InputGroup>
    </Stack>
  );
};

export default DailyOps;
