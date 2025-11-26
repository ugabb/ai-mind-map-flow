import { format } from 'date-fns'

export const formatDateTime = (date: string) => format(new Date(date), 'HH:mm')
