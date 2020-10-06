import * as React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
import {
  Stack,
  Text,
  Icon,
  Image,
  PseudoBox,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Button,
  useToast,
} from "@chakra-ui/core";

import { XDeparture, Location, City, Operator } from "../../types";

import { displayPrice } from "../../shared/utils";

type XDepartureCardProps = React.ReactNode & {
  departure: XDeparture;
  origin: {
    location: Location;
    city: City;
  };
  destination: {
    location: Location;
    city: City;
  };
  operator: Operator;
};
export const XDepartureCard: React.FunctionComponent<XDepartureCardProps> = ({
  departure: {
    id,
    prices,
    departure_time,
    departure_timezone,
    arrival_time,
    arrival_timezone,
    ...departure
  },
  origin: { location: originLocation, city: originCity },
  destination: { location: destinationLocation, city: destinationCity },
  operator,
  ...rest
}) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.extend(duration);
  dayjs.extend(relativeTime);
  dayjs.duration(1, "minutes").humanize();

  const toast = useToast();
  const onBookTicket = () => {
    toast({
      title: "Coming soon!",
      description:
        "We are working on making it possible for you to book your tickets here soon. In the meantime, you can visit the original Busbud website at www.busbud.com.",
      status: "info",
      position: "top-right",
      isClosable: true,
    });
  };

  const tripDuration = dayjs
    .duration(dayjs(arrival_time).diff(dayjs(departure_time)))
    .humanize();

  return (
    <PseudoBox
      key={id}
      borderWidth="1px"
      rounded="lg"
      padding="1.5rem"
      boxShadow="md"
      _hover={{
        transform: "scale(0.99, 0.99)",
        cursor: "pointer",
      }}
      _focusWithin={{
        boxShadow: "outline",
      }}
      {...rest}
    >
      <Stack isInline justifyContent="space-between">
        <Stack>
          <Stat>
            <StatNumber as="strong" color="blue.600">
              {dayjs(departure_time).format("LT")}{" "}
              <Icon
                name="arrow-forward"
                size="1.5rem"
                color="blue.600"
                aria-label="to"
                marginX="0.25rem"
              />
              {dayjs(arrival_time).format("LT")}
            </StatNumber>
            <StatLabel>Duration: {tripDuration}</StatLabel>
            <StatHelpText>
              <Stack as="span" spacing="0.25rem">
                <Text as="span">
                  From: {originLocation?.name}, {originCity?.name}
                </Text>
                <Text as="span">
                  To: {destinationLocation?.name}, {destinationCity?.name}
                </Text>
              </Stack>
            </StatHelpText>
            <StatHelpText></StatHelpText>
          </Stat>
          <Image height="2.5rem" objectFit="contain" src={operator.logo_url} />
        </Stack>
        <Stack spacing="0.5rem">
          <Button variantColor="orange" onClick={onBookTicket}>
            Select ticket
          </Button>
          <Stat>
            <StatLabel>Total</StatLabel>
            <StatNumber>
              {displayPrice(prices?.total / 100, prices?.currency)}
            </StatNumber>
            <StatHelpText>Class: {departure.class}</StatHelpText>
          </Stat>
        </Stack>
      </Stack>
    </PseudoBox>
  );
};
