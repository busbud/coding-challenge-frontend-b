import React from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import { useForm, FormProvider } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers";
import {
  Box,
  Flex,
  Button,
  IconButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
  Tooltip,
  SimpleGrid,
  Divider,
  useToast,
} from "@chakra-ui/core";

import { buildLink } from "../../shared/utils";
import {
  ControlledNumberInput,
  PageSlice,
  PageTitle,
  PageDescription,
  Canonical,
  HrefLangAlternates,
  SocialMediaMetaTags,
} from "../../shared/components";
import {
  GEOHASHES,
  XDepartureSearchStandardSchema,
} from "../../shared/constants";
import { QueryDepartureParams } from "../../types";

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
  if (!values.origin || !values.destination) {
    throw new Error("Geohash not found");
  }
  // Standardise date format
  values.outbound_date = dayjs(values.outbound_date).format().split("T")[0];
  // Remove values that are falsy
  Object.keys(values).forEach((key) => !values[key] && delete values[key]);
  return values;
};

const OSHEAGA_DEFAULT_VALUES = {
  origin: "Manchester",
  destination: "London",
  outbound_date: new Date().toISOString().split("T")[0],
  adult: 1,
  child: 0,
  senior: 0,
};

type HomePageProps = {};
export const HomePage: React.FunctionComponent<HomePageProps> = () => {
  const toast = useToast();

  const history = useHistory();

  const formMethods = useForm<QueryDepartureParams, Object>({
    defaultValues: OSHEAGA_DEFAULT_VALUES,
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
      const searchResultsUrl = buildLink(
        "/departures",
        formatFormValuesToQueryParams(data)
      );
      history.push(searchResultsUrl);
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
    <PageSlice padding={{ _: 0, sm: "1rem" }}>
      <PageTitle title="Book your bus ticket" />
      <PageDescription description="Search the web to find the perfect bus ticket for travelling where you want around the globe!" />
      <Canonical path="/" />
      <HrefLangAlternates />
      <SocialMediaMetaTags />
      <FormProvider {...formMethods}>
        <Stack
          as="form"
          backgroundColor="white"
          boxShadow="lg"
          borderWidth="1px"
          rounded="lg"
          padding="2rem"
          spacing={6}
          onSubmit={handleSubmit(onSubmit)}
        >
          <DevTool control={control} />

          <Flex as="fieldset" flexDirection="row">
            <Text as="legend" fontWeight="bold">
              Where do you want to go?
            </Text>
            <Flex width="100%" alignItems="flex-start" flexWrap="wrap">
              <FormControl
                isRequired
                isInvalid={!!errors?.origin}
                flexGrow={{ sm: 1 }}
              >
                <FormLabel htmlFor="origin">Departure place</FormLabel>
                <Input
                  name="origin"
                  id="origin"
                  type="text"
                  placeholder="From"
                  ref={register}
                />
                <FormErrorMessage>{errors?.origin?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                isInvalid={!!errors?.destination}
                width={{ _: "75%", sm: "auto" }}
                order={{ _: 0, sm: 3 }}
                flexGrow={{ sm: 1 }}
              >
                <FormLabel htmlFor="destination">Destination place</FormLabel>
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
          <Flex flexDirection={{ _: "column", lg: "row" }}>
            <FormControl
              isRequired
              isInvalid={!!errors?.outbound_date}
              flexGrow={1}
              minWidth={{ lg: "16rem" }}
              textAlign="center"
              display="flex"
              flexDirection="column"
              marginBottom="1.5rem"
            >
              <Flex flexDirection={{ _: "column", md: "row", lg: "column" }}>
                <FormLabel
                  htmlFor="outboundDate"
                  flexGrow={{ _: 1, lg: 0 }}
                  fontWeight="bold"
                  marginBottom={{ _: "0.5rem", md: 0, lg: "2rem" }}
                >
                  When are you leaving?
                </FormLabel>
                <Input
                  type="date"
                  name="outbound_date"
                  id="outboundDate"
                  textTransform="uppercase"
                  ref={register}
                  maxWidth={{ md: "45%", lg: "85%" }}
                />
              </Flex>
              <FormErrorMessage>
                {errors?.outbound_date?.message}
              </FormErrorMessage>
            </FormControl>
            <Divider orientation="vertical" height="max-content" />
            <Stack as="fieldset" flexGrow={1}>
              <Text as="legend" width="100%" fontWeight="bold">
                Who's coming?
              </Text>
              <SimpleGrid
                spacing={{ _: 4, lg: 10 }}
                columns={{ _: 1, sm: 2, md: 3 }}
              >
                <FormControl
                  isInvalid={!!errors?.adult}
                  display="flex"
                  flexDirection={{ _: "column", lg: "row" }}
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Flex width="100%" flexWrap="wrap">
                    <FormLabel
                      htmlFor="adult"
                      flexGrow={1}
                      minWidth="8rem"
                      alignSelf="flex-end"
                    >
                      Adults
                    </FormLabel>
                    <ControlledNumberInput
                      name="adult"
                      aria-label="adult"
                      variantColor="blue"
                      width="7rem"
                    />
                  </Flex>
                  <FormErrorMessage width="100%" border="solid 1px orange">
                    {errors?.adult?.message}
                  </FormErrorMessage>
                </FormControl>
                <Tooltip hasArrow label="Coming soon" placement="bottom">
                  <FormControl
                    // TODO we need to be able to set the ages of the children before re-enabling
                    isDisabled
                    isInvalid={!!errors?.child}
                    display="flex"
                    flexDirection={{ _: "column", sm: "row" }}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Flex width="100%" flexWrap="wrap">
                      <FormLabel
                        htmlFor="child"
                        flexGrow={1}
                        minWidth="8rem"
                        alignSelf="flex-end"
                      >
                        Children
                      </FormLabel>
                      <ControlledNumberInput
                        name="child"
                        aria-label="child"
                        variantColor="blue"
                        width="7rem"
                      />
                    </Flex>
                    <FormErrorMessage width="100%" border="solid 1px orange">
                      {errors?.child?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Tooltip>
                <Tooltip hasArrow label="Coming soon" placement="bottom">
                  <FormControl
                    // TODO we need to be able to set the ages of the seniors before re-enabling
                    isDisabled
                    isInvalid={!!errors?.senior}
                    display="flex"
                    flexDirection={{ _: "column", lg: "row" }}
                    alignItems="center"
                    flexWrap="wrap"
                  >
                    <Flex width="100%" flexWrap="wrap">
                      <FormLabel
                        htmlFor="senior"
                        flexGrow={1}
                        minWidth="8rem"
                        alignSelf="flex-end"
                      >
                        Seniors
                      </FormLabel>
                      <ControlledNumberInput
                        name="senior"
                        aria-label="senior"
                        variantColor="blue"
                        width="7rem"
                      />
                    </Flex>
                    <FormErrorMessage width="100%" border="solid 1px orange">
                      {errors?.senior?.message}
                    </FormErrorMessage>
                  </FormControl>
                </Tooltip>
              </SimpleGrid>
            </Stack>
          </Flex>
          <Button
            type="submit"
            width="fit-content"
            variantColor="blue"
            margin="auto"
            paddingX="2rem"
          >
            Search my ticket
          </Button>
        </Stack>
      </FormProvider>
    </PageSlice>
  );
};
