export const convertMpsToKph = (distance) => {
  return Math.round(distance * 3.6);
};

export const convertDegreeToDirection = (degree) => {
  let value = Math.floor((degree / 22.5) + 0.5);
  let directions = ["N", "N/NE", "NE", "E/NE", "E", "E/SE", "SE", "S/SE", "S", "S/SW", "SW", "W/SW", "W", "W/NW", "NW", "N/NW"];
  return directions[(value % 16)];
};

export const convertTimestampToTime = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let formattedTime = hours + ':' + minutes.substr(-2);
  return formattedTime;
};

export const getDayNumberFromTimestamp = (timestamp) => {
  let date = new Date(timestamp * 1000);
  return date.getDay();
};

export const getDayFromTimestamp = (timestamp) => {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let date = new Date(timestamp * 1000);
  return days[date.getDay()];
};

export const getDaysDifference = (dayNumber) => {
  return Math.abs(new Date().getDay() - dayNumber);
}

export const convertDateTime = (datetime) => {
  let date = new Date(Date.parse(datetime))
  return date.toString();
}
  
export const weatherCodeConverter = (code) => {
  if (code === 800) return 0;
  switch (Math.floor(code/100)) {
    case 2:
      return 1
    case 3:
      return 2
    case 5:
      return 3
    case 6:
      return 4
    case 7:
      return 5
    case 8:
      return 6
    default:
      return 0
  }
} 