import moment from 'moment';

export const displayISOTime = (time) => {
  return moment(time).format('dddd, MMMM Do YYYY, HH:mm');
};
