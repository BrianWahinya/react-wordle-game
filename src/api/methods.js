import axios from "axios";
import configs from "../helpers/configs";

export const getWordsByLevel = (level) =>
  axios.get(`${configs.api.levels[level]}`).then((res) => {
    // console.log("res", res.data);
    return res.data;
  });
