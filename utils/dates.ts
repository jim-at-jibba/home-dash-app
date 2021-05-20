import {format, isValid, parseISO} from "date-fns"

export function dateFormat(date: string, dateFormatString = "dd LLL yyyy H:mm"): string {
  if (isValid(parseISO(date))) {
    return format(parseISO(date), dateFormatString)
  }
  return ""
}
