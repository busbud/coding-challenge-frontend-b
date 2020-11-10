import React from 'react';
import Acta from 'acta';
import Styled from 'react-styles-injector';

import { EActaStateKeys } from '@constants/actaKeys';
import { mdiCalendarClock, mdiPlusCircle, mdiTimerSand } from '@mdi/js';
import { EAppColors } from '@uiAssets/colors';
import { Button } from '@uiComponents/Button';
import { Icon } from '@uiComponents/Icon';
import { ITicket } from '../processBusBudData';
import styles from './TicketsList.pcss';
import { i18n } from '@utils/i18n';
import { homeTexts } from '@texts/home';
import { sendAppAlert } from '@utils/sendAppAlert';
import { IAppAlertData } from '@uiComponents/AppAlert/AppAlert';
import { TicketDetails } from './TicketDetails';

interface IProps {
  baseline: string;
  tickets: Array<ITicket>;
  title: string;
  day: string;
}

export const TicketsList = ({
  baseline,
  day,
  tickets,
  title,
}: IProps): JSX.Element => {
  const language = Acta.getState(EActaStateKeys.APPLICATION_LANGUAGE);
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
  };

  return (
    <Styled styles={styles} tag="section">
      <header>
        <h2>{title}</h2>
        <p>
          {baseline}
          <br />
          {day}
        </p>
      </header>

      <ul>
        {tickets.map((ticket, index) => (
          <li
            key={ticket.id}
            style={{ animationDelay: `${100 + 75 * index}ms` }}>
            <div className="data">
              <div className="time">
                <Icon icon={mdiCalendarClock} color="#999" />
                <p>
                  {new Date(ticket.departureTime).toLocaleDateString(
                    `${language}-CA`,
                    timeOptions,
                  )}
                  <br />
                  {new Date(ticket.arrivalTime).toLocaleDateString(
                    `${language}-CA`,
                    timeOptions,
                  )}
                </p>
              </div>

              <div className="duration">
                <Icon icon={mdiTimerSand} color="#999" />
                <p>{`${Math.floor(ticket.duration / 60)}h${
                  ticket.duration % 60 || ''
                }`}</p>
                <div className="spacer" />
                <button
                  onClick={() =>
                    sendAppAlert({
                      message: <TicketDetails ticket={ticket} />,
                    } as IAppAlertData)
                  }>
                  <Icon icon={mdiPlusCircle} color={EAppColors.MAIN} />
                </button>
              </div>

              <footer>
                {(ticket.price / 100).toLocaleString(`${language}-CA`, {
                  style: 'currency',
                  currency: 'CAD',
                  maximumFractionDigits: 2,
                })}

                <Button
                  label={i18n(homeTexts.buyLabel)}
                  size="small"
                  outerHref={ticket.link}
                  target="_blank"
                />
              </footer>
            </div>

            <div className="logoContainer">
              <img src={ticket.logo} alt="company logo" />
            </div>
          </li>
        ))}
      </ul>
    </Styled>
  );
};
