import moment from "moment";

const formatTime = (time) => {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

export { formatTime };
