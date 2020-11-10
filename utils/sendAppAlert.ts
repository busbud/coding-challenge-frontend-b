import Acta from 'acta';
import { EActaStateKeys } from '@constants/actaKeys';
import { IAppAlertData } from '@uiComponents/AppAlert/AppAlert';

export const sendAppAlert = ({
  cancelBackground,
  cancelIcon,
  cancelLabel,
  closeCallback,
  closeLabel,
  confirmBackground,
  confirmCallback,
  confirmIcon,
  confirmLabel,
  message,
}: IAppAlertData): void => {
  Acta.setState({
    [EActaStateKeys.ACTA_ALERT_STATE_KEY]: {
      cancelBackground,
      cancelIcon,
      cancelLabel,
      closeCallback,
      closeLabel,
      confirmBackground,
      confirmCallback,
      confirmIcon,
      confirmLabel,
      message,
    },
  });
};
