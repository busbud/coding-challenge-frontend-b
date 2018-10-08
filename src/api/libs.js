import { Translation } from '../languages/translation';


//eslint-disable-next-line
Date.prototype.format = function(format) {
    let D = Translation.days.split(','),
        M = Translation.months.split(',');
    const me = this;
    return format.replace(
        /a|A|Z|S(SS)?|ss?|mm?|HH?|hh?|D{1,4}|M{1,4}|YY(YY)?|'([^']|'')*'/g,
        function(str) {
            let c1 = str.charAt(0),
                ret =
                    str.charAt(0) === "'"
                        ? (c1 = 0) || str.slice(1, -1).replace(/''/g, "'")
                        : str === 'a'
                            ? me.getHours() < 12
                                ? 'am'
                                : 'pm'
                            : str === 'A'
                                ? me.getHours() < 12
                                    ? 'AM'
                                    : 'PM'
                                : str === 'Z'
                                    ? ('+' + -me.getTimezoneOffset() / 60)
                                          .replace(/^\D?(\D)/, '$1')
                                          .replace(/^(.)(.)$/, '$10$2') + '00'
                                    : c1 === 'S'
                                        ? me.getMilliseconds()
                                        : c1 === 's'
                                            ? me.getSeconds()
                                            : c1 === 'H'
                                                ? me.getHours()
                                                : c1 === 'h'
                                                    ? me.getHours() % 12 || 12
                                                    : c1 === 'D' &&
                                                      str.length > 2
                                                        ? D[me.getDay()].slice(
                                                              0,
                                                              str.length > 3
                                                                  ? 9
                                                                  : 3
                                                          )
                                                        : c1 === 'D'
                                                            ? me.getDate()
                                                            : c1 === 'M' &&
                                                              str.length > 2
                                                                ? M[
                                                                      me.getMonth()
                                                                  ].slice(
                                                                      0,
                                                                      str.length >
                                                                      3
                                                                          ? 9
                                                                          : 3
                                                                  )
                                                                : c1 === 'm'
                                                                    ? me.getMinutes()
                                                                    : c1 === 'M'
                                                                        ? me.getMonth() +
                                                                          1
                                                                        : (
                                                                              '' +
                                                                              me.getFullYear()
                                                                          ).slice(
                                                                              -str.length
                                                                          );
            return c1 && str.length < 4 && ('' + ret).length < str.length
                ? ('00' + ret).slice(-str.length)
                : ret;
        }
    );
};
