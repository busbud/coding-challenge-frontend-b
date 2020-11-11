import React from 'react';
import Styled from 'react-styles-injector';

import { HeroBackground } from './components/HeroBackground';
import { Header } from './components/Header';
import styles from './Home.pcss';
import { TicketsLoader } from './components/TicketsLoader';
import { TicketsList } from './components/TicketsList';
import { LanguageMenu } from './components/LanguageMenu';
import Acta from 'acta';
import { EActaStateKeys } from '@constants/actaKeys';
import { i18n } from '@utils/i18n';
import { homeTexts } from '@texts/home';
import { ITicket, processBusBudData } from './processBusBudData';
import { AppAlert } from '@uiComponents/AppAlert';

interface IState {
  isLoadingTickets: boolean;
  ticketsToGo: Array<ITicket>;
  ticketsToComeBack: Array<ITicket>;
}

export class Home extends React.Component<unknown, IState> {
  public state = {
    isLoadingTickets: true,
    ticketsToGo: [],
    ticketsToComeBack: [],
  };

  public componentDidMount = (): void => {
    this.getTicketsData();
    Acta.subscribeState(EActaStateKeys.APPLICATION_LANGUAGE, 'language', this);
  };

  private getTicketsData = async (): Promise<void> => {
    /**
     * One shot event website = harcoded dates and locations
     */
    const requestURLToGo =
      'https://napi.busbud.com/x-departures/f2m673/f25dvk/2020-11-29/poll';
    const requestURLComeBack =
      'https://napi.busbud.com/x-departures/f25dvk/f2m673/2020-11-30/poll';
    const requestHeaders = new Headers();
    requestHeaders.append('x-busbud-token', 'PARTNER_BaASYYHxTxuOINEOMWq5GA');
    const params: RequestInit = {
      method: 'GET',
      headers: requestHeaders,
    };
    const [ticketsToGo, ticketsToComeBack] = await Promise.all([
      (await fetch(requestURLToGo, params)).json(),
      (await fetch(requestURLComeBack, params)).json(),
    ]);

    /**
     * This is a bad temporary solution to a weird problem.
     * My requests sometimes come back empty.
     */
    if (
      ticketsToGo.departures.length === 0 ||
      ticketsToComeBack.departures.length === 0
    ) {
      return this.getTicketsData();
    }

    this.setState({
      ticketsToGo: processBusBudData(ticketsToGo),
      ticketsToComeBack: processBusBudData(ticketsToComeBack),
      isLoadingTickets: false,
    });
  };

  public render(): JSX.Element {
    const { isLoadingTickets, ticketsToGo, ticketsToComeBack } = this.state;
    const language = Acta.getState(EActaStateKeys.APPLICATION_LANGUAGE);

    return (
      <Styled styles={styles}>
        <LanguageMenu />
        <Header />
        <HeroBackground />

        {isLoadingTickets && <TicketsLoader />}

        <div className="tickets">
          {ticketsToGo.length > 0 && (
            <TicketsList
              title={i18n(homeTexts.ticketsToGoTitle)}
              baseline={'Québec > Montréal'}
              day={new Date('2020/08/02').toLocaleDateString(`${language}-CA`, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              tickets={ticketsToGo}
            />
          )}
          {ticketsToComeBack.length > 0 && (
            <TicketsList
              title={i18n(homeTexts.ticketsToComeBackTitle)}
              baseline={'Montréal > Québec'}
              day={new Date('08-03-2020').toLocaleDateString(`${language}-CA`, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              tickets={ticketsToComeBack}
            />
          )}
        </div>

        <AppAlert />
      </Styled>
    );
  }
}
