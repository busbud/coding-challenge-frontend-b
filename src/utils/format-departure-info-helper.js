import moment from 'moment';

export function formatTime(time) {
  return moment(time).format('HH:mm');
}

export function formatPrice(number) {
  let str = number.toString();

  if (str.length > 2) {
    str = str.substr(0, str.length - 2) + '.' + str.substr(str.length - 2, 2);
  }
  return str;
}

export function findLocationName(locationId, locations) {
  const location = _.find(locations, location => location.id === locationId);
  return location.name;
}

export function getOperatorLogo(operatorId, operators) {
  const operator = _.find(
    operators,
    operator => operator.source_id === operatorId,
  );
  return operator.logo_url;
}
