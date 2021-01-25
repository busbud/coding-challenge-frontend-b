import { format, formatISO, startOfToday } from 'date-fns'
import { LanguageDomain } from '.'

export const localeDateMask = (locale: LanguageDomain.Language) => {
  switch (locale) {
    case LanguageDomain.PT:
      return 'dd/MM/yyyy'
      break

    default:
      return 'MM/dd/yyyy'
      break
  }
}
export const dateFormatted = (date: Date, mask: string = 'yyyy-MM-dd') => {
  return format(date, mask)
}

export const dateISO = (date: Date) => formatISO(date)

export const todayString = () => dateISO(new Date())
