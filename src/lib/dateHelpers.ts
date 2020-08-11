const WEEK_DAYS = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota']

const getWeekDayFromDate = (date: string | number | Date): string => {
  const dateInstance = new Date(date)
  return WEEK_DAYS[dateInstance.getDay()]
}

const getHoursAndMinutesFromDate = (date: string | number | Date): string => {
  const dateInstance = new Date(date)
  const hours = String(dateInstance.getHours()).padStart(2, '0')
  const minutes = String(dateInstance.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

export { getWeekDayFromDate, getHoursAndMinutesFromDate }
