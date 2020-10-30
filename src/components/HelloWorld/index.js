// @flow
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title } from './styledComp';

type Props = {
  name: String,
}

function HelloWorld({ name }: Props) {
  const { t } = useTranslation();
  return (
    <Title>
      {`${t('helloworld_title')} ${name} 👋🏻`}
    </Title>
  );
}

export default HelloWorld;
