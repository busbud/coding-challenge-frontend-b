// @flow
import React from 'react';

import MuiDownshift from 'mui-downshift';
import { withStyles } from '@material-ui/core/styles';
import type { LocationSuggestion } from '../../types';

type Props = {|
  suggestions: Array<LocationSuggestion>,
  label: string,
  onChange: () => Array<any>,
|};

const UnstyledLocationSelector = (props: Props) => {
  const { suggestions, label, onChange } = props;
  return (
    <MuiDownshift
      items={suggestions}
      getInputProps={() => ({
        label,
      })}
      onChange={onChange}
    />
  );
};

export const LocationSelector = withStyles({})(UnstyledLocationSelector);
