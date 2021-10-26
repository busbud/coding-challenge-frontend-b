import styled, { css } from "styled-components";
import { rgba } from "polished";
import {
  MdAddCircleOutline,
  MdExplore,
  MdPeople,
  MdRemoveCircleOutline,
  MdSchedule,
} from "react-icons/md";

import { Button } from "@/components";
import { breakpoints, colors } from "@/theme";

interface Props {
  hasError: boolean;
  hasLoaded: boolean;
  isLoading: boolean;
  onSearchClick: () => void;
  onPassengersDecrement: () => void;
  onPassengersIncrement: () => void;
  passengers: number;
}

const OuterWrap = styled.div`
  @media (min-width: ${breakpoints.tablet}) {
    position: sticky;
    top: 20px;
    z-index: 1;
  }
`;

const Wrap = styled.div<{ pushUp: boolean }>`
  margin-bottom: 40px;
  padding: 24px;
  border-radius: 8px;
  background: ${rgba(colors.light, 0.8)};
  box-shadow: 0 3px 0 0 ${rgba(colors.lightAlt, 0.8)},
    0 2px 14px ${rgba(colors.grey, 0.35)};
  display: flex;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(10px);

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    position: relative;
    top: ${(props) => (!props.pushUp ? "max(50vh - 280px, 30px)" : 0)};
    transition: top 0.4s ease;
  }
`;

const BusbudLogo = styled.img`
  margin: 0 auto 26px;

  @media (min-width: ${breakpoints.tablet}) {
    margin-left: 0;
    margin-bottom: 0;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${breakpoints.tabletSmall}) {
    flex-direction: row;
    align-items: center;
  }
`;

const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  min-width: 160px;
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 20px;

    &::after {
      content: "";
      height: 1px;
      width: 102px;
      border-radius: 2px;
      background: ${colors.lightAlt};
      position: absolute;
      right: 50%;
      bottom: -10px;
      transform: translate(50%, -50%);
    }
  }

  @media (min-width: ${breakpoints.tabletSmall}) {
    width: auto;

    &:last-of-type {
      min-width: initial;
    }

    &:not(:last-of-type) {
      margin-bottom: 0;
      margin-right: 32px;

      &::after {
        height: 52px;
        width: 1px;
        right: -16px;
        top: 50%;
        bottom: initial;
      }
    }
  }
`;

const FilterIcon = styled.i`
  font-size: 24px;
  color: ${colors.primaryLight};
  margin-right: 8px;
  flex-shrink: 0;
`;

const FilterLabel = styled.span`
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 400;
  color: ${colors.grey};
  margin-bottom: 2px;
`;

const FilterValueRow = styled.div`
  display: flex;
  align-items: center;
`;

const FilterValue = styled.strong<{ centerAlign?: boolean }>`
  font-weight: 600;
  font-size: 18px;
  min-width: 24px;
  text-align: ${(props) => (props.centerAlign ? "center" : "left")};
`;

const FilterValueDivider = styled.small`
  font-size: 16px;
  color: ${colors.grey};
  opacity: 0.8;
  font-weight: 400;
`;

const FilterNumberButton = styled.button<{ side?: "left" | "right" }>`
  padding: 0;
  margin: 0;
  border: 0;
  appearance: none;
  background: none;
  cursor: pointer;
  color: ${colors.primaryLight};
  font-size: 18px;

  svg {
    display: block;
  }

  ${({ side = "left" }) => {
    const property = side === "left" ? "margin-right" : "margin-left";

    return css`
      ${property}: 4px;
    `;
  }}
`;

const SearchButtonWrap = styled.div`
  margin: 32px auto 0;

  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 0;
    margin-right: 0;
  }
`;

const ErrorIndicator = styled.div`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translate(-50%, 100%);
  padding: 10px;
  background: ${colors.danger};
  color: ${colors.light};
  border-radius: 4px;
`;

export const SearchBar: React.FC<Props> = ({
  hasError,
  hasLoaded,
  isLoading,
  onSearchClick,
  onPassengersDecrement,
  onPassengersIncrement,
  passengers,
}) => {
  return (
    <OuterWrap>
      <Wrap pushUp={hasLoaded}>
        <BusbudLogo
          src="/busbud-logo.svg"
          alt="Busbud"
          width={30}
          height={39.3}
        />
        <SearchFilters>
          <SearchFilter>
            <FilterIcon as={MdExplore} />

            <div>
              <FilterLabel>Where</FilterLabel>
              <FilterValueRow>
                <FilterValue>
                  Québec <FilterValueDivider>→</FilterValueDivider> Montréal
                </FilterValue>
              </FilterValueRow>
            </div>
          </SearchFilter>

          <SearchFilter>
            <FilterIcon as={MdSchedule} />

            <div>
              <FilterLabel>When</FilterLabel>
              <FilterValueRow>
                <FilterValue>1st Nov. 2021</FilterValue>
              </FilterValueRow>
            </div>
          </SearchFilter>

          <SearchFilter>
            <FilterIcon as={MdPeople} />

            <div>
              <FilterLabel>Passengers</FilterLabel>
              <FilterValueRow>
                <FilterNumberButton onClick={onPassengersDecrement}>
                  <MdRemoveCircleOutline />
                </FilterNumberButton>
                <FilterValue centerAlign>{passengers}</FilterValue>
                <FilterNumberButton
                  onClick={onPassengersIncrement}
                  side="right"
                >
                  <MdAddCircleOutline />
                </FilterNumberButton>
              </FilterValueRow>
            </div>
          </SearchFilter>
        </SearchFilters>

        <SearchButtonWrap>
          <Button
            isLoading={isLoading}
            onClick={onSearchClick}
            variant="secondary"
          >
            Search
          </Button>
        </SearchButtonWrap>

        {hasError && (
          <ErrorIndicator>
            An error ocurred, please try again later.
          </ErrorIndicator>
        )}
      </Wrap>
    </OuterWrap>
  );
};
