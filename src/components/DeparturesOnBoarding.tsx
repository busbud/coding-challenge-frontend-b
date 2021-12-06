import LocalStorageService from '../helpers/LocalStorageService';
import i18nInstance from '../localization/i18nInstance';
import { LANGUAGE_LOCAL_STORAGE_KEY } from '../localization/i18nOptions';
import DepartureBoardSharpIcon from '@mui/icons-material/DepartureBoardSharp';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onStart: () => void;
  open: boolean;
  origin: string;
  destination: string;
  date: Date;
}

const DeparturesOnBoarding = ({
  onStart,
  open,
  origin,
  destination,
  date,
}: Props): JSX.Element => {
  const { t } = useTranslation('common');

  const [language, setLanguage] = React.useState(i18nInstance.language);

  const handleLanguageChange = useCallback(
    async (event, newLanguage: string) => {
      await i18nInstance.changeLanguage(newLanguage);
      setLanguage(newLanguage);
      LocalStorageService.setItem(LANGUAGE_LOCAL_STORAGE_KEY, newLanguage);
    },
    [],
  );

  return (
    <Modal
      disablePortal
      open={open}
      sx={{
        display: 'flex',
        p: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={1}
        bgcolor="background.paper"
        width={400}
        borderRadius={1}
        boxShadow={5}
        p={4}
      >
        <ToggleButtonGroup
          color="primary"
          value={language}
          exclusive
          onChange={handleLanguageChange}
        >
          <ToggleButton value="en">English</ToggleButton>
          <ToggleButton value="fr">Français</ToggleButton>
        </ToggleButtonGroup>

        <DepartureBoardSharpIcon
          sx={{ height: 120, width: 120, color: 'primary.light' }}
        />

        <Typography textAlign="center">
          {t('travelFrom')} <b>{origin}</b> {t('to')} <b>{destination}</b>{' '}
          {t('onDate', { date })}
        </Typography>

        <Button
          variant="contained"
          size="large"
          fullWidth
          color="primary"
          onClick={onStart}
        >
          {t('departures')}
        </Button>
      </Stack>
    </Modal>
  );
};

export default DeparturesOnBoarding;
