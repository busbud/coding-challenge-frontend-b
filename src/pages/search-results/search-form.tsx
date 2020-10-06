import React from "react";
import dayjs from "dayjs";
import { useHistory } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import { DevTool } from "@hookform/devtools";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/core";

import { QueryDepartureParams } from "../../types";

import { ControlledNumberInput } from "../../shared/components";
import {
  GEOHASHES,
  XDepartureSearchStandardSchema,
} from "../../shared/constants";
import {
  buildLink,
  getBusbudXDeparturesUrlParams,
  useQuery,
} from "../../shared/utils";

const formatFormValuesToQueryParams = (
  values: QueryDepartureParams = {
    origin: "",
    destination: "",
    outbound_date: "",
  }
): QueryDepartureParams => {
  // TODO I don't like mutating the values we initially received
  // Convert cities names to geohashes
  values.origin = GEOHASHES[values.origin];
  values.destination = GEOHASHES[values.destination];
  if (!values.origin && !values.destination) {
    throw new Error("Geohash not found");
  }
  // Standardise date format
  values.outbound_date = dayjs(values.outbound_date).format().split("T")[0];
  // Remove values that are falsy
  Object.keys(values).forEach((key) => !values[key] && delete values[key]);
  return values;
};

type SearchFormProps = {};
export const SearchForm: React.FunctionComponent<SearchFormProps> = () => {
  const toast = useToast();

  const {
    origin: originGeohash,
    destination: destinationGeohash,
    outbound_date,
    adult,
    child,
    senior,
  } = useQuery<getBusbudXDeparturesUrlParams>();
  const history = useHistory();

  const [origin] =
    Object.entries(GEOHASHES).find(([key, value]) => value === originGeohash) ||
    [];
  const [destination] =
    Object.entries(GEOHASHES).find(
      ([key, value]) => value === destinationGeohash
    ) || [];

  const formMethods = useForm<QueryDepartureParams>({
    defaultValues: {
      origin,
      destination,
      outbound_date,
      adult,
      child,
      senior,
    },
    resolver: yupResolver(XDepartureSearchStandardSchema),
  });
  const {
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    control,
  } = formMethods;

  const swapOriginAndDestination = () => {
    const tmp = getValues("origin");
    setValue("origin", getValues("destination"));
    setValue("destination", tmp);
  };

  const onSubmit = (data: QueryDepartureParams) => {
    try {
      const newSearchResultsUrl = buildLink(
        "/departures",
        formatFormValuesToQueryParams(data)
      );
      history.push(newSearchResultsUrl);
    } catch (error) {
      console.error(error);
      toast({
        title: "This itinerary is not available",
        description:
          "This application only supports a specific amount of cities at the moment. Please change your trip.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <DevTool control={control} />
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        boxShadow="lg"
        borderWidth="1px"
        rounded="lg"
        padding={{ _: "0.75rem", sm: "1.5rem", md: "2rem" }}
        spacing="1rem"
      >
        <Flex flexDirection={{ _: "column", lg: "row" }}>
          <Flex flexDirection={{ _: "column", md: "row" }} flexGrow={1}>
            <Flex as="fieldset" flexBasis="95%">
              <Text as="legend" fontWeight="bold">
                Itinerary
              </Text>

              <Flex width="100%" flexDirection={{ _: "column", sm: "row" }}>
                <FormControl
                  isRequired
                  isInvalid={!!errors?.origin}
                  flexGrow={1}
                  flexBasis="40%"
                >
                  <FormLabel htmlFor="origin">Departure</FormLabel>
                  <Input
                    name="origin"
                    id="origin"
                    type="text"
                    placeholder="From"
                    ref={register}
                  />
                  <FormErrorMessage>{errors?.origin?.message}</FormErrorMessage>
                </FormControl>
                <Flex
                  flexDirection={{ _: "row", sm: "row-reverse" }}
                  flexGrow={1}
                  flexBasis="50%"
                >
                  <FormControl
                    isRequired
                    isInvalid={!!errors?.destination}
                    flexGrow={1}
                  >
                    <FormLabel htmlFor="destination">Destination</FormLabel>
                    <Input
                      name="destination"
                      id="destination"
                      type="text"
                      placeholder="To"
                      ref={register}
                    />
                    <FormErrorMessage>
                      {errors?.destination?.message}
                    </FormErrorMessage>
                  </FormControl>
                  <Box marginTop="1.75rem">
                    <Tooltip
                      hasArrow
                      label="Swap departure and destination"
                      aria-label="Swap departure and destination places"
                      placement="bottom"
                    >
                      <IconButton
                        variantColor="blue"
                        variant="ghost"
                        aria-label="Swap departure and destination places"
                        icon="arrow-up-down"
                        isRound
                        transform={{ _: "none", sm: "rotate(90deg)" }}
                        onClick={swapOriginAndDestination}
                      />
                    </Tooltip>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <FormControl
              flexBasis={{ _: "30%", lg: "5%" }}
              isRequired
              isInvalid={!!errors?.outbound_date}
              as={Box}
              margin={{ _: "1rem 0 0 0", md: "0 0 0 1rem" }}
              flexDirection={{ _: "column", md: "row", lg: "column" }}
            >
              <Flex flexDirection={{ _: "column", sm: "row", md: "column" }}>
                <FormLabel
                  htmlFor="outboundDate"
                  fontWeight="bold"
                  flexGrow={1}
                  flexBasis="65%"
                  minHeight={{ md: "3.25rem" }}
                >
                  Date
                </FormLabel>
                <Input
                  type="date"
                  name="outbound_date"
                  id="outboundDate"
                  flexBasis={{ _: "unset", sm: "45%", md: "unset" }}
                  minWidth="8rem"
                  maxWidth={{ _: "16rem", md: "unset", lg: "16rem" }}
                  textAlign="center"
                  textTransform="uppercase"
                  ref={register}
                />
              </Flex>
              <FormErrorMessage>
                {errors?.outbound_date?.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>

          <Flex
            as="fieldset"
            flexGrow={1}
            flexBasis="30%"
            margin={{ _: "1rem 0 0 0", lg: "0 0 0 1rem" }}
          >
            <Text as="legend" fontWeight="bold">
              Who's coming?
            </Text>
            <SimpleGrid
              columns={{ _: 1, sm: 2, md: 3 }}
              spacing="1rem"
              width="100%"
            >
              <FormControl
                isInvalid={!!errors?.adult}
                as={Flex}
                flexDirection="column"
              >
                <Flex flexDirection={{ sm: "column" }} width="100%">
                  <FormLabel htmlFor="adult" flexGrow={1}>
                    Passengers
                  </FormLabel>
                  <ControlledNumberInput
                    minWidth="8rem"
                    maxWidth={{ _: "9rem", sm: "100%" }}
                    name="adult"
                    aria-label="adult"
                    variantColor="blue"
                  />
                </Flex>
                <FormErrorMessage>{errors?.adult?.message}</FormErrorMessage>
              </FormControl>
              <Tooltip hasArrow label="Coming soon" placement="bottom">
                <FormControl
                  isDisabled
                  isInvalid={!!errors?.child}
                  as={Flex}
                  flexDirection="column"
                >
                  <Flex flexDirection={{ sm: "column" }} width="100%">
                    <FormLabel htmlFor="child" flexGrow={1}>
                      Children
                    </FormLabel>
                    <ControlledNumberInput
                      minWidth="8rem"
                      maxWidth={{ _: "9rem", sm: "100%" }}
                      name="child"
                      aria-label="child"
                      variantColor="blue"
                    />
                  </Flex>
                  <FormErrorMessage>{errors?.child?.message}</FormErrorMessage>
                </FormControl>
              </Tooltip>
              <FormControl
                isInvalid={!!errors?.senior}
                as={Flex}
                flexDirection="column"
              >
                <Flex flexDirection={{ sm: "column" }} width="100%">
                  <FormLabel htmlFor="senior" flexGrow={1}>
                    Seniors
                  </FormLabel>
                  <ControlledNumberInput
                    minWidth="8rem"
                    maxWidth={{ _: "9rem", sm: "100%" }}
                    name="senior"
                    aria-label="senior"
                    variantColor="blue"
                  />
                </Flex>
                <FormErrorMessage>{errors?.senior?.message}</FormErrorMessage>
              </FormControl>
            </SimpleGrid>
          </Flex>
        </Flex>
        <Button
          type="submit"
          width="fit-content"
          variantColor="blue"
          margin="auto"
          paddingX="2rem"
        >
          Find another ticket
        </Button>
      </Stack>
    </FormProvider>
  );
};
