import _ from 'lodash';

export function filterOutDuplicateData(stateData, data) {
  return _.filter(data, el => {
    if (!_.some(stateData, stateEL => el.id === stateEL.id)) {
      return el;
    }
  });
}
