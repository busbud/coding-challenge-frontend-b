import React from 'react';
import renderer from 'react-test-renderer';
import ListCard from './listCard.js';

describe('<listCard /> component', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <ListCard
          key={1}
          price={100}
          departureTime={"10:05, Sunday, August 2nd 2020"}
          arrivalTime={"00:25, Monday, August 3rd 2020"}
          departureStation={"GW Bridge"}
          arrivalStation={"Aéroport YUL"}
          operator={"Greyhound"}
        />
      )
      .toJSON();
    expect(tree).toMatchInlineSnapshot(`
      <div
        className="MuiPaper-root MuiPaper-elevation1 MuiCard-root listCard MuiPaper-rounded"
      >
        <div
          className="MuiCardContent-root"
        >
          <div
            className="listCard__upper"
          >
            <div
              className="listCard__upper--operator"
            />
            <div
              className="listCard__upper--price"
            >
              100
            </div>
          </div>
          <div
            className="listCard__lower"
          >
            <div
              className="listCard__lower--schedule"
            >
              <p>
                Depart
              </p>
              <p>
                <span>
                  10:05, Sunday, August 2nd 2020
                </span>
                  at  
              </p>
            </div>
            <div
              className="listCard__lower--schedule"
            >
              <p>
                Arrive
              </p>
              <p>
                <span>
                  00:25, Monday, August 3rd 2020
                </span>
                  at 
                 
              </p>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
