import React from 'react';
import { NextPage } from 'next';

import { HTMLHead } from '@uiComponents/HTMLHead';
import { Home } from '@views/Home';
import { GlobalLayout } from '@uiComponents/GlobalLayout';

export default class HomePage extends React.Component<NextPage, unknown> {
  public render(): JSX.Element {
    return (
      <>
        <HTMLHead />
        <GlobalLayout>
          <Home />
        </GlobalLayout>
      </>
    );
  }
}
