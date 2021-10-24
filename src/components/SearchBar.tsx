import styled, { css } from "styled-components";
import { rgba, darken } from "polished";
import {
  MdAddCircleOutline,
  MdExplore,
  MdPeople,
  MdRemoveCircleOutline,
  MdSchedule,
} from "react-icons/md";

import { breakpoints, colors } from "@/theme";

interface Props {
  isLoading: boolean;
  onSearchClick: () => void;
  onPassengersDecrement: () => void;
  onPassengersIncrement: () => void;
  passengers: number;
}

const Wrap = styled.div`
  position: sticky;
  top: 20px;
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
`;

const SearchFilter = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  min-width: 160px;

  &:not(:last-of-type) {
    margin-right: 32px;

    &::after {
      content: "";
      height: 52px;
      width: 1px;
      border-radius: 2px;
      background: ${colors.lightAlt};
      position: absolute;
      right: -16px;
      top: 50%;
      transform: translate(50%, -50%);
    }
  }

  &:last-of-type {
    min-width: initial;
  }
`;

const FilterIcon = styled.i`
  font-size: 24px;
  color: ${colors.primaryLight};
  border-radius: 3px;
  margin-right: 8px;
  flex-shrink: 0;
`;

const FilterText = styled.div``;

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

const SearchButton = styled.button<{ isLoading?: boolean }>`
  margin: 32px auto 0;
  padding: 12px 28px;
  border: 0;
  border-radius: 9999px;
  appearance: none;
  background: ${colors.primary};
  color: ${colors.light};
  font-size: 18px;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  box-shadow: 0 2px 8px ${rgba(colors.primaryDark, 0.2)};
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background: ${darken(0.075, colors.primary)};
  }

  ${(props) =>
    props.isLoading &&
    css`
      color: transparent;
      pointer-events: none;

      &::after {
        content: "";
        width: 24px;
        height: 24px;
        background: url("/spinner.svg") no-repeat center center / contain;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    `}

  @media (min-width: ${breakpoints.tablet}) {
    margin-top: 0;
    margin-right: 0;
  }
`;

export const SearchBar: React.FC<Props> = ({
  isLoading,
  onSearchClick,
  onPassengersDecrement,
  onPassengersIncrement,
  passengers,
}) => {
  return (
    <Wrap>
      <BusbudLogo
        src="/busbud-logo.svg"
        alt="Busbud"
        width={30}
        height={39.3}
      />
      <SearchFilters>
        <SearchFilter>
          <FilterIcon as={MdExplore} />

          <FilterText>
            <FilterLabel>Where</FilterLabel>
            <FilterValueRow>
              <FilterValue>Québec → Montréal</FilterValue>
            </FilterValueRow>
          </FilterText>
        </SearchFilter>

        <SearchFilter>
          <FilterIcon as={MdSchedule} />

          <FilterText>
            <FilterLabel>When</FilterLabel>
            <FilterValueRow>
              <FilterValue>01/11/2021</FilterValue>
            </FilterValueRow>
          </FilterText>
        </SearchFilter>

        <SearchFilter>
          <FilterIcon as={MdPeople} />

          <FilterText>
            <FilterLabel>Passengers</FilterLabel>
            <FilterValueRow>
              <FilterNumberButton onClick={onPassengersDecrement}>
                <MdRemoveCircleOutline />
              </FilterNumberButton>
              <FilterValue centerAlign>{passengers}</FilterValue>
              <FilterNumberButton onClick={onPassengersIncrement} side="right">
                <MdAddCircleOutline />
              </FilterNumberButton>
            </FilterValueRow>
          </FilterText>
        </SearchFilter>
      </SearchFilters>

      <SearchButton isLoading={isLoading} onClick={onSearchClick}>
        Search
      </SearchButton>
    </Wrap>
  );
};
