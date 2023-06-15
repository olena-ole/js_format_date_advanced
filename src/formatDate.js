'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const separatedDate = date.split(oldSeparator);

  const day = separatedDate[fromFormat.indexOf('DD')];
  const month = separatedDate[fromFormat.indexOf('MM')];
  let year
    = fromFormat.includes('YYYY')
      ? separatedDate[fromFormat.indexOf('YYYY')]
      : separatedDate[fromFormat.indexOf('YY')];

  if (toFormat.includes('YYYY') && year.length === 2) {
    year = +year < 30 ? 20 + year : 19 + year;
  }

  if (toFormat.includes('YY') && year.length === 4) {
    year = year.slice(2);
  }

  separatedDate[toFormat.indexOf('DD')] = day;
  separatedDate[toFormat.indexOf('MM')] = month;

  const newFormatYearIndex = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY')
    : toFormat.indexOf('YY');

  separatedDate[newFormatYearIndex] = year;

  return separatedDate.join(newSeparator);
}

module.exports = formatDate;
