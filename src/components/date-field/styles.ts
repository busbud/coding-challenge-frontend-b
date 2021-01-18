// Packages
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

export const Overlay = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: ${theme.colors.white};
    box-shadow: ${rgba(theme.colors.muted, 1)};
    border: 2px solid ${rgba(theme.colors.gray, 0.3)};
    border-radius: ${theme.border.radius};

    position: absolute;
    transform: translateY(4px);
    z-index: 100;
  `}
`

export const OverlayToolbar = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    display: flex;
    flex-direction: row;
    padding-left: ${theme.spaces.xsmall};
    padding-right: ${theme.spaces.xsmall};
    padding-top: ${theme.spaces.xsmall};
  `}
`

export const LibStyles = styled.div`
  ${({ theme }) => css`
    .DayPicker {
      display: inline-block;
      font-size: ${theme.font.sizes.small};
      margin-top: 0.4rem;
    }

    .DayPicker-wrapper {
      position: relative;
      flex-direction: row;
      padding-bottom: 1rem;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;

      user-select: none;
    }

    .DayPicker-Months {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .DayPicker-Month {
      display: table;
      margin: 0 1rem;
      margin-top: 1rem;
      border-spacing: 0;
      border-collapse: collapse;

      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;

      user-select: none;
    }

    .DayPicker-NavButton {
      position: absolute;
      top: 1rem;
      right: 1.5rem;
      left: auto;

      display: inline-block;
      margin-top: 2px;
      width: 1.25rem;
      height: 1.25rem;
      background-position: center;
      background-size: 50%;
      background-repeat: no-repeat;
      color: ${theme.colors.primary};
      cursor: pointer;
    }

    .DayPicker-NavButton:hover {
      opacity: 0.8;
    }

    .DayPicker-NavButton--prev {
      margin-right: 1.5rem;
      border-right: 2px solid ${rgba(theme.colors.gray, 0.3)};
      border-bottom: 2px solid ${rgba(theme.colors.gray, 0.3)};
      height: 12px;
      width: 12px;
      transform: rotate(130deg);
    }

    .DayPicker-NavButton--next {
      border-right: 2px solid ${rgba(theme.colors.gray, 0.3)};
      border-bottom: 2px solid ${rgba(theme.colors.gray, 0.3)};
      height: 12px;
      width: 12px;
      transform: rotate(-45deg);
    }

    .DayPicker-NavButton--interactionDisabled {
      display: none;
    }

    .DayPicker-Caption {
      display: table-caption;
      margin-bottom: 0.5rem;
      padding: 0 0.5rem;
      text-align: left;
      font-size: ${theme.font.sizes.small};
    }

    .DayPicker-Caption > div {
      font-weight: 500;
      font-size: ${theme.font.sizes.small};
    }

    .DayPicker-Weekdays {
      display: table-header-group;
      margin-top: 1rem;
    }

    .DayPicker-WeekdaysRow {
      display: table-row;
    }

    .DayPicker-Weekday {
      display: table-cell;
      padding: 0.5rem;
      color: ${theme.colors.gray};
      text-align: center;
      font-size: ${theme.font.sizes.small};
    }

    .DayPicker-Weekday abbr[title] {
      border-bottom: none;
      text-decoration: none;
    }

    .DayPicker-Body {
      display: table-row-group;
    }

    .DayPicker-Week {
      display: table-row;
    }

    .DayPicker-Day {
      display: table-cell;
      padding: 0.5rem;
      border-radius: 50%;
      vertical-align: middle;
      text-align: center;
      cursor: pointer;
    }

    .DayPicker-WeekNumber {
      display: table-cell;
      padding: 0.5rem;
      min-width: 1rem;
      border-right: 1px solid ${theme.colors.muted};
      color: ${theme.colors.gray};
      vertical-align: middle;
      text-align: right;
      font-size: ${theme.font.sizes.small};
      cursor: pointer;
    }

    .DayPicker--interactionDisabled .DayPicker-Day {
      cursor: default;
    }

    .DayPicker-Footer {
      padding-top: 0.5rem;
    }

    .DayPicker-TodayButton {
      border: none;
      background-color: transparent;
      background-image: none;
      box-shadow: none;
      color: ${theme.colors.blue};
      font-size: ${theme.font.sizes.small};
      cursor: pointer;
    }

    .DayPicker-Day--today {
      color: ${theme.colors.blue};
      font-weight: 700;
    }

    .DayPicker-Day--outside {
      color: ${theme.colors.gray};
      cursor: default;
    }

    .DayPicker-Day--disabled {
      color: ${rgba(theme.colors.gray, 0.7)};
      cursor: default;
    }

    .DayPicker-Day--sunday {
      background-color: #f7f8f8;
    }

    .DayPicker-Day--sunday:not(.DayPicker-Day--today) {
      color: #dce0e0;
    }

    .DayPicker:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: ${rgba(theme.colors.blue, 0.7)};
      color: ${theme.colors.white};
    }

    .DayPickerInput {
      display: inline-block;
      width: 100%;
    }

    .DayPickerInput-OverlayWrapper {
      position: relative;
    }

    .Selectable
      .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
      background-color: ${theme.colors.blue};
      color: ${theme.colors.white};
    }

    .Selectable .DayPicker-Day {
      border-radius: 50%;
    }
  `}
`
