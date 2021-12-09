export const Calendar = () => {
  const dayOfWeek = new Date().getDay()
  let first
  if (dayOfWeek === 0) {
    first = new Date(new Date().setDate(new Date().getDate() - (6))).getDate()
  } else {
    first = new Date(new Date().setDate(new Date().getDate() - (dayOfWeek - 1))).getDate()
  }
  // let first = new Date(new Date().setDate(new Date().getDate() - (dayOfWeek - 1))).getDate()

  const year = new Date().getFullYear()
  const month = new Date().getMonth()
  // console.log('Разница бул значение ', new Date().getDate() - first )
  let last = new Date(year, month, 0).getDate()
  if((new Date().getDate() - first) >= 0) {
    last = new Date(year, month + 1 , 0).getDate()
  }
  //last = new Date(year, month, 0).getDate()
  const arr = []
  while (first <= last) {
    arr.push(first)
    first++
  }
  if (arr[arr.length - 1] === 30) {

  }
  for (let i = 1; arr.length <= 29; i++) {
    arr.push(i)
  }
  return monthCalendar(arr)
  //return arr

}

const monthCalendar = (arr) => {
  const months = ['Январь', "Февраль", 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
  const currentMonth = months[new Date().getMonth()]
  const index = arr.indexOf(1)
  // const manyDays =
  if (index) {
    const day = new Date(new Date().setMonth(new Date().getMonth() + 1, 1)).getDay()
    let number = day - 1
    if (day === 0) {
      number = 6
    }
    console.log(number)
    const end = arr.length - index
    // const laterDays = index - number
    // const nextMonthDays = arr.slice(laterDays, index).concat(arr.splice(index, end))

    const nextMonthDays = new Array(number).fill('').concat(arr.splice(index, end))
    const nextMonth = months[new Date().getMonth() + 1] ? months[new Date().getMonth() + 1] : months[0]

    return {
      [currentMonth]: arr,
      [nextMonth]: nextMonthDays
    }
  }
  return {
    currentMonth: arr
  }
}


export  const toInterval = (sec, setTime) => {
  const oneDay = 24 * 3600
  const oneHour = 3600
  const oneMinute = 60
  let day = 0
  let hours = 0
  let minutes = 0
  let seconds = 0
  if ((sec / oneDay) >= 1) {
    day = Math.floor(sec / oneDay)
    hours = Math.floor((sec - (day * 24 * 3600))/oneHour)
    // minutes = Math.floor((sec -(day * 24 * 3600) - (hours*3600))/oneMinute)
    // seconds = (sec -(day * 24 * 3600) - (hours*3600) - minutes * 60)
  } else {
    hours = Math.floor(sec / 3600)

  }
  if (sec > 60) {
    minutes = Math.floor((sec -(day * 24 * 3600) - (hours*3600))/oneMinute)
  }
  seconds = (sec -(day * 24 * 3600) - (hours*3600) - minutes * 60)
  setTime(`${day}:${hours}:${minutes}:${seconds}`)
  console.log(day, ' ',  hours, ' ', minutes, ' ', seconds)
}

