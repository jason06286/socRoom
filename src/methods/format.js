import moment from "moment";

const formatTime = (time) => {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
};

const calcTimes = (time) => {
  return moment(time).fromNow();
};
export { formatTime, calcTimes };
