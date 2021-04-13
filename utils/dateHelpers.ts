enum DateStrBrand { }

export type DateStr = string & DateStrBrand

export function checkValidDateStr(str: string): str is DateStr {
  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null
}

export function toISO8061(date: Date | string): DateStr {
  if (typeof date === 'string') {
    if (checkValidDateStr(date)) {
      return date;
    } else {
      throw new Error(`Invalid date string: ${date}`)
    }
  } else if(date instanceof Date){
    const [dateString] = date
      .toISOString()
      .split('T');

    if (checkValidDateStr(dateString)) {
      return dateString
    }
  }
  throw new Error(`Shouldn't get here (invalid toDateStr provided): ${date}`)
}

