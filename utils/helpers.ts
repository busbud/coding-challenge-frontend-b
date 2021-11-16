import dayjs from 'dayjs'

export const formatData = value => dayjs(value).format('YYYY-MM-DD')
