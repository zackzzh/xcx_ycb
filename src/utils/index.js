// 格式化Number
function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

// 格式化时间
export function formatTime(date, type) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  switch (type) {
    case 0:
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
      break;
    default:
      const t1 = [year, month, day].map(formatNumber).join('/')
      const t2 = [hour, minute, second].map(formatNumber).join(':')
      return `${t1} ${t2}`;
      break;
  }
}

export default {
  formatNumber,
  formatTime
}
