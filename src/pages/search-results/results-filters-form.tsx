import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/core";
import { Operator } from "../../types";

export type ResultsFiltersFormData = {
  operators: string[];
  minPrice: number;
  maxPrice: number;
  classes: string[];
};
type ResultsFiltersFormProps = ResultsFiltersFormData & {
  operators: Operator[];
  minPrice: number;
  maxPrice: number;
  classes: string[];
  onFiltersChange: Function;
};
export const ResultsFiltersForm: React.FunctionComponent<ResultsFiltersFormProps> = ({
  onFiltersChange,
  operators = [],
  minPrice = 0,
  maxPrice = 10,
  classes = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => setIsOpen(!isOpen);

  const { register, control, getValues } = useForm();

  return (
    <Stack
      as="form"
      spacing="2rem"
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      padding="1.5rem"
      onChange={(values: ResultsFiltersFormData) => {
        onFiltersChange(getValues());
      }}
    >
      {process.env.NODE_ENV === "development" && <DevTool control={control} />}
      <Stack isInline>
        <Heading as="h2" fontSize="3xl" flexGrow={1}>
          Filter the results
        </Heading>
        <IconButton
          variant="ghost"
          variantColor="blue"
          aria-label={isOpen ? "Hide" : "View more"}
          icon={isOpen ? "triangle-up" : "triangle-down"}
          onClick={toggleIsOpen}
        />
      </Stack>
      <Collapse isOpen={isOpen}>
        <Stack as="fieldset" spacing="0.5rem">
          <Text as="legend" fontWeight="bold" fontSize="lg">
            By price
          </Text>
          <Stack isInline spacing="1rem">
            <FormControl>
              <FormLabel htmlFor="origin">Minimum</FormLabel>
              <InputGroup>
                <InputLeftElement color="gray.300" fontSize="1.2em">
                  $
                </InputLeftElement>
                <Input
                  name="minPrice"
                  id="minPrice"
                  type="number"
                  placeholder={minPrice.toString()}
                  ref={register}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="origin">Maximum</FormLabel>
              <InputGroup>
                <InputLeftElement color="gray.300" fontSize="1.2em">
                  $
                </InputLeftElement>
                <Input
                  name="maxPrice"
                  id="maxPrice"
                  type="number"
                  placeholder={maxPrice.toString()}
                  ref={register}
                />
              </InputGroup>
            </FormControl>
          </Stack>
        </Stack>
        {operators.length > 1 && (
          <Stack as="fieldset" spacing="0.5rem">
            <Text as="legend" fontWeight="bold" fontSize="lg">
              By operators
            </Text>
            {operators.map((operator) => (
              <Checkbox
                key={operator.id}
                size="lg"
                id={operator.id}
                value={operator.id}
                name="operators"
                ref={register}
              >
                {operator.display_name}
              </Checkbox>
            ))}
          </Stack>
        )}
        {classes.length > 1 && (
          <Stack as="fieldset" spacing="0.5rem">
            <Text as="legend" fontWeight="bold" fontSize="lg">
              By travel class
            </Text>
            {classes.map((classValue) => (
              <Checkbox
                key={classValue}
                size="lg"
                id={classValue}
                value={classValue}
                name="classes"
                ref={register}
              >
                {classValue}
              </Checkbox>
            ))}
          </Stack>
        )}
      </Collapse>
    </Stack>
  );
};
