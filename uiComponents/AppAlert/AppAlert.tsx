import React from 'react';
import Styled from 'react-styles-injector';
import Acta from 'acta';

import { Button } from '@uiComponents/Button';
import styles from './AppAlertStyles.pcss';
import { EAppColors } from '@uiAssets/colors';
import { EActaStateKeys } from '@constants/actaKeys';

interface IState {
  cancelLabel?: string;
  cancelBackground?: string;
  cancelIcon?: string;
  closeCallback?: () => void;
  closeLabel?: string;
  confirmBackground?: EAppColors;
  confirmCallback?: () => void;
  confirmIcon?: string;
  confirmLabel?: string;
  message?: React.ReactNode;
}

export interface IAppAlertData {
  cancelLabel?: string;
  closeCallback?: () => void;
  closeLabel?: string;
  confirmBackground?: EAppColors;
  confirmCallback?: () => void;
  confirmLabel?: string;
  message: React.ReactNode;
  cancelBackground?: string;
  cancelIcon?: string;
  confirmIcon?: string;
}

export class AppAlert extends React.Component<unknown, IState> {
  public state = {};

  public componentDidMount = (): void => {
    Acta.subscribeState(
      EActaStateKeys.ACTA_ALERT_STATE_KEY,
      this.onReceiveAlert,
      this,
    );
  };

  private onReceiveAlert = (data: IAppAlertData) => {
    if (data) {
      this.setState({
        closeCallback: data.closeCallback
          ? () => data.closeCallback && data.closeCallback()
          : undefined,
        confirmBackground: data.confirmBackground || undefined,
        confirmCallback: data.confirmCallback
          ? () => data.confirmCallback?.()
          : undefined,
        message: data.message,
        cancelLabel: data.cancelLabel,
        closeLabel: data.closeLabel,
        confirmLabel: data.confirmLabel,
        cancelBackground: data.cancelBackground,
        cancelIcon: data.cancelIcon,
        confirmIcon: data.confirmIcon,
      });
    }
  };

  private closeAlert = () => {
    const { closeCallback } = this.state as IState;
    if (closeCallback) {
      closeCallback();
    }
    this.resetState();
  };

  private confirm = () => {
    const { confirmCallback } = this.state as IState;
    if (confirmCallback) {
      confirmCallback();
    }
    this.resetState();
  };

  private resetState = () => {
    this.setState({
      closeCallback: undefined,
      confirmBackground: undefined,
      confirmCallback: undefined,
      message: undefined,
      cancelLabel: undefined,
      closeLabel: undefined,
      confirmLabel: undefined,
      cancelBackground: undefined,
      cancelIcon: undefined,
      confirmIcon: undefined,
    });
  };

  public render(): JSX.Element {
    const {
      cancelBackground = '#666',
      cancelIcon,
      cancelLabel,
      closeLabel,
      confirmBackground = EAppColors.MAIN,
      confirmCallback,
      confirmIcon,
      confirmLabel,
      message,
    } = this.state as IState;

    return (
      <Styled styles={styles} className={message ? 'displayed' : 'hidden'}>
        <div className="background" onClick={this.closeAlert} />
        <div className="container">
          <div>{message}</div>
          <footer>
            {confirmCallback ? (
              <>
                <Button
                  size="small"
                  label={cancelLabel || 'Cancel'}
                  onClick={this.closeAlert}
                  iconLeft={cancelIcon}
                  background={cancelBackground}
                />
                <Button
                  size="small"
                  iconLeft={confirmIcon}
                  label={confirmLabel || 'Confirm'}
                  onClick={this.confirm}
                  background={confirmBackground}
                />
              </>
            ) : (
              <Button
                size="small"
                label={closeLabel || 'OK'}
                onClick={this.closeAlert}
              />
            )}
          </footer>
        </div>
      </Styled>
    );
  }
}
