import moment from "moment";

export const parseDate = (date) => {
    const [year, month, day, time, meridiem] = moment(String(date))
      .utc()
      .format("YYYY MM DD, h:mm a")
      .split(" ");
    return [`${year}/${month}/${day?.slice(0, -1)}`, time + meridiem];
  };
