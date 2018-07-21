import { expect } from "chai";
import React from "react";
import { shallow } from "enzyme";
// Third party libraries
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Moment from "react-moment";
import moment from "moment";
// Component import
import Journey from "./Journey";

describe("<Journey />", () => {
  const journey = {
    id: "YmY1NjY5YWE6MjlmY2UwOWM",
    departureTime: "2018-08-02T09:00:00",
    originLocation: "Gare d'autocars de Montréal",
    arrivalTime: "2018-08-02T10:00:00",
    destinationLocation: "Port Authority Bus Terminal",
    prices: "123",
    operator: {
      name: "Adirondack Trailways",
      logoUrl:
        "https://busbud.imgix.net/operator-logos/adirondack-trailways.png?h={height}&w={width}&auto=format&fit=fill&bg=0FFF",
      url: "https://trailwaysny.com"
    },
    linksBusbud:
      "https://www.busbud.com/en/deeplink/f25dvk/dr5reg/YmY1NjY5YWE6MjlmY2UwOWM?outbound_date=2018-08-02&return_date&adults=1&children=0&seniors=0&child_ages=&senior_ages=&discount_code&utm_source={utm_source}&utm_campaign={utm_campaign}&utm_medium={utm_medium}"
  };

  let wrapperJourney;
  it("Renders without crashing", () => {
    wrapperJourney = shallow(<Journey key={journey.id} journey={journey} />);
    expect(wrapperJourney);
  });

  describe("Action for display journey detail on Busbud plateform", () => {
    it("<Button /> present in rendering", () => {
      expect(wrapperJourney.find(Button)).to.have.length(1);
    });
    it("With correct link to journey on Busbud plateform", () => {
      // const log = wrapperJourney.find(Button);
      // console.log(log.debug());

      expect(wrapperJourney.find(Button).prop("href")).equal(
        journey.linksBusbud
      );
    });
  });

  describe("Departure informations", () => {
    it("Date time", () => {
      expect(
        wrapperJourney
          .find(".journey__info-down-left")
          .find(Moment)
          .html()
      ).to.contain(
        moment(journey.departureTime).format(
          wrapperJourney.instance().hourFormat
        )
      );
    });

    it("Origin location", () => {
      expect(
        wrapperJourney
          .find(".journey__info-up-left")
          .find(Typography)
          .equals(<Typography>{journey.originLocation}</Typography>)
      ).to.equal(true);
    });
  });

  describe("Arrival informations", () => {
    it("Date time", () => {
      expect(
        wrapperJourney
          .find(".journey__info-down-right")
          .find(Moment)
          .html()
      ).to.contain(
        moment(journey.arrivalTime).format(wrapperJourney.instance().hourFormat)
      );
    });

    it("Destination location", () => {
      expect(
        wrapperJourney
          .find(".journey__info-up-right")
          .find(Typography)
          .equals(<Typography>{journey.destinationLocation}</Typography>)
      ).to.equal(true);
    });
  });
});
