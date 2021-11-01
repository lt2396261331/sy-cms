import dayjs from 'dayjs'
import urc from 'dayjs/plugin/utc'

dayjs.extend(urc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  return dayjs.utc(utcString).format(format)
}
