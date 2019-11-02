import React from "react";
import { fireEvent, waitForElement } from "@testing-library/react";

import ScheduleCard from "../index";
import { setupComponent } from "../../../utils/jest";
import mockSchedules from "../../../__mocks__/schedules";
import { formatedDate, formatedTime } from "../../../utils/date";
import en from "../../../translations/en";

describe("ScheduleCard component", () => {
  it("should render without throwing an error", function() {
    const { asFragment } = setupComponent(
      <ScheduleCard
        schedule={mockSchedules.departures[0]}
        operator={mockSchedules.operators[0]}
        origin={mockSchedules.locations[0]}
        destination={mockSchedules.locations[1]}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render data as receveid", function() {
    const schedule = mockSchedules.departures[0];
    const operator = mockSchedules.operators[0];
    const { getByTestId } = setupComponent(
      <ScheduleCard
        schedule={schedule}
        operator={operator}
        origin={mockSchedules.locations[0]}
        destination={mockSchedules.locations[1]}
      />
    );
    expect(getByTestId("scard-operator")).toHaveTextContent(
      operator.display_name
    );
    expect(getByTestId("scard-departure-date")).toHaveTextContent(
      formatedDate(schedule.departure_time)
    );
    expect(getByTestId("scard-price")).toHaveTextContent(
      schedule.prices.currency + " " + (schedule.prices.total / 100).toFixed(2)
    );
    expect(getByTestId("scard-departure")).toHaveTextContent(
      formatedTime(schedule.departure_time)
    );
  });

  it("should show bus details only after click", async function() {
    const { getByTestId, debug } = setupComponent(
      <ScheduleCard
        schedule={mockSchedules.departures[0]}
        operator={mockSchedules.operators[0]}
        origin={mockSchedules.locations[0]}
        destination={mockSchedules.locations[1]}
      />
    );

    fireEvent.click(getByTestId("scard-show-details"));
    const amenitiesNode = await waitForElement(() =>
      getByTestId("scard-amenities")
    );
    expect(amenitiesNode).toHaveTextContent(en.amenities);
  });
});
