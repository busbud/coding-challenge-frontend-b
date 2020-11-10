import Acta from 'acta';
import Styled from 'react-styles-injector';

import styles from './TicketDetails.pcss';
import { ITicket } from '../processBusBudData';
import { i18n } from '@utils/i18n';
import { homeTexts } from '@texts/home';
import { EActaStateKeys } from '@constants/actaKeys';

const priceFormating = (amount: number): string => {
  const language = Acta.getState(EActaStateKeys.APPLICATION_LANGUAGE);

  return (amount / 100).toLocaleString(`${language}-CA`, {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 2,
  });
};

export const TicketDetails = ({ ticket }: { ticket: ITicket }): JSX.Element => {
  const language = Acta.getState(EActaStateKeys.APPLICATION_LANGUAGE);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  };

  return (
    <Styled styles={styles}>
      <h3>{i18n(homeTexts.ticketDetails.generalDataTitle)}</h3>
      <p>
        <span>{i18n(homeTexts.ticketDetails.departure)}:</span>{' '}
        <b>
          {new Date(ticket.departureTime).toLocaleDateString(
            `${language}-CA`,
            timeOptions,
          )}{' '}
          {i18n(homeTexts.ticketDetails.at)} {ticket.departureStation}
        </b>
      </p>
      <p>
        <span>{i18n(homeTexts.ticketDetails.arrival)}:</span>{' '}
        <b>
          {new Date(ticket.arrivalTime).toLocaleDateString(
            `${language}-CA`,
            timeOptions,
          )}{' '}
          {i18n(homeTexts.ticketDetails.at)} {ticket.arrivalStation}
        </b>
      </p>
      <p>
        <span>{i18n(homeTexts.ticketDetails.seatsLeft)}:</span>{' '}
        <b>{ticket.availableSeats}</b>
      </p>
      <hr />
      <h3>{i18n(homeTexts.ticketDetails.tripFareTitle)}</h3>
      <p>
        <span>{i18n(homeTexts.ticketDetails.passenger)}:</span>{' '}
        <b>{priceFormating(ticket.priceBreakdown.base)}</b>
      </p>
      <p>
        <span>{i18n(homeTexts.ticketDetails.fees)}:</span>{' '}
        <b>{priceFormating(ticket.priceBreakdown.fees)}</b>
      </p>
      <p>
        <span>{i18n(homeTexts.ticketDetails.taxes)}:</span>{' '}
        <b>{priceFormating(ticket.priceBreakdown.taxes)}</b>
      </p>
      <p>
        <b>{i18n(homeTexts.ticketDetails.total)}:</b>{' '}
        <u>
          <b>{priceFormating(ticket.price)}</b>
        </u>
      </p>
    </Styled>
  );
};
