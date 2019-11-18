import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../store';
import {
  departuresSelector,
  AugmentedDeparture,
  getDepartures,
  departuresInfoSelector,
  DepartureInformation
} from '../../store/departures';
import InfoDisplay from '../../components/InfoDisplay';
import DeparturesList from '../../components/DeparturesList';
import LayoutDefault from '../../layouts/LayoutDefault';

interface Props {
  onClickAction: (payload: string) => void;
  departures: AugmentedDeparture[];
  information: DepartureInformation;
}

function Departures({ departures, information }: Props) {
  return (
    <LayoutDefault>
      <InfoDisplay information={information} />
      <DeparturesList information={information} departures={departures} />
    </LayoutDefault>
  );
}

const mapStateToProps = (state: AppState) => ({
  departures: departuresSelector(state),
  information: departuresInfoSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClickAction: () => dispatch(getDepartures())
});

export default connect(mapStateToProps, mapDispatchToProps)(Departures);
