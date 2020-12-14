import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FetchAction from "../redux/actions/fetchAction";
import Moment from "react-moment";
import "moment-timezone";
import DatePicker from "react-datepicker";
import styles from "../styles/mainStyles.module.scss";

function ResultTable() {
  //1. We call "useDispatch" (React hook) to trigger our request petition
  const dispatch = useDispatch();

  //2. We define a function that combines dispatch function + redux action
  const getFirstFetch = (date) => dispatch(FetchAction(date));

  //Selectors
  const oneFetch = useSelector((state) => state.firstFetch.mainInformation);
  const departuresFetch = useSelector(
    (state) => state.firstFetch.allDepartures.departures
  );

  //DatePicker
  const [startDate, setStartDate] = useState(new Date());

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  //Setting up Search Action
  const onFormSubmit = (date, e) => {
    setStartDate(date);
    getFirstFetch(formatDate(date));
  };

  //Setting up useEffect Hook for the first render
  useEffect((startDate, e) => {
    let today = formatDate(new Date());
    getFirstFetch(today);
  }, []);

  return (
    <Container>
      <div className={styles.bigSquare}>
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Label className={styles.labelStyle}>
                  Select Origin
                </Form.Label>
                <Form.Control className={styles.inputStyle} as="select">
                  <option>Quebec City, QC, Canada</option>
                  <option>Montreal, QC, Canada</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label className={styles.labelStyle}>
                  Select Destination
                </Form.Label>
                <Form.Control className={styles.inputStyle} as="select">
                  <option>Montreal, QC, Canada</option>
                  <option>Quebec City, QC, Canada</option>
                </Form.Control>
              </Col>
              <Col className={styles.datePick}>
                <Form.Label className={styles.labelStyle}>
                  Select Date
                </Form.Label>
                <DatePicker
                  className={styles.dateBorder}
                  selected={startDate}
                  onChange={onFormSubmit}
                  name="date"
                  dateFormat="yyyy/MM/dd"
                />
              </Col>
            </Form.Row>
          </Form.Group>
        </Form>
      </div>

      <Table className={styles.bigTable} responsive bordered hover>
        <thead>
          <tr>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Price</th>
            <th>Origin</th>
            <th>Destination</th>
          </tr>
        </thead>
        <tbody>
          {departuresFetch?.map((depart, i) => (
            <tr key={i}>
              <td>
                <Moment
                  format="MMMM Do YYYY, h:mm:ss a"
                  date={depart.departure_time}
                />
              </td>
              <td>
                <Moment
                  format="MMMM Do YYYY, h:mm:ss a"
                  date={depart.arrival_time}
                />
              </td>
              <td>
                {depart.prices.total} {depart.prices.currency}
              </td>
              <td>{oneFetch.cities[0].short_name}</td>
              <td>{oneFetch.cities[1].short_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ResultTable;
