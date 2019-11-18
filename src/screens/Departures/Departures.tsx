import React, { Component } from 'react';
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
import { LoadDataParams } from '../../helpers/api';

interface Props {
  startPolling: (params: LoadDataParams) => void;
  departures: AugmentedDeparture[];
  information: DepartureInformation;
  match?: {
    params: LoadDataParams;
  };
}

class Departures extends Component<Props> {
  componentDidMount() {
    this.startPolling();
  }

  startPolling = () => {
    const {
      information: { complete },
      startPolling,
      match
    } = this.props;
    // If SSR fetching was not complete we need
    // to start polling
    if (!complete && match) {
      startPolling(match.params || null);
    }
  };

  render() {
    const { departures, information } = this.props;
    return (
      <LayoutDefault>
        <InfoDisplay information={information} />
        <DeparturesList information={information} departures={departures} />
      </LayoutDefault>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  departures: departuresSelector(state),
  information: departuresInfoSelector(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startPolling: (params: LoadDataParams) => dispatch(getDepartures(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Departures);
