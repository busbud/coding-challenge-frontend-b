import * as React from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps } from "@reach/router";
import styled from "styled-components";

import * as S from "./../../StyledComponents";
import { greyDark, primary, secondary } from "../../../assets/Colors";
import { reg } from "../../../assets/Spacing";

const Purchase: React.FC<RouteComponentProps> = () => {
  return (
    <Background>
      <Card>
        <Thanks>
          <FormattedMessage id="purchase.thanks" />
        </Thanks>
        <Disclaimer>
          <FormattedMessage
            id="purchase.disclaimer"
            defaultMessage=""
            values={{
              website: (...elt: Array<HTMLElement>) => (
                <ExternalLink href="https://busbud.com">{elt}</ExternalLink>
              )
            }}
          />
        </Disclaimer>
      </Card>
    </Background>
  );
};

const Background = styled.div`
  background-image: url("https://www.osheaga.com/uploads/osheaga/backgrounds/Osheaga-homecoming.jpb.jpg?v=67a753a108ff7d65f3d9355c44518fdf");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled(S.Card)`
  max-width: 50%;
  text-align: center;
  color: ${greyDark};
`;

const Disclaimer = styled.div`
  color: ${greyDark};
  font-size: 0.8em;
`;

const ExternalLink = styled.a`
  color: ${secondary};
`;

const Thanks = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: ${primary};
  margin-bottom: ${reg};
`;

export default Purchase;
