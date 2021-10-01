const { query } = require("express");

const sendResponse = ({
  res,
  status,
  data,
  message = "No message included.",
}) => {
  return res.status(status).json({ status, data, message });
};

const getMinMax = (targetValueObj) => {
  let result = {};
  const keysArr = Object.keys(targetValueObj);

  // iterate through each nutrition
  keysArr.map((key) => {
    result = {
      ...result,
      [key]: {
        [`min${key}`]: targetValueObj[key] * 1 - 5,
        [`max${key}`]: targetValueObj[key] * 1 + 5,
      },
    };
  });

  return result;
};

const getQueryString = (queryObject) => {
  let result = "";
  const queryArr = Object.entries(queryObject);

  queryArr.forEach((query) => {
    if (query[0] !== `isStrictMode` && query[1] !== 0 && query[1] !== "") {
      result = result.concat("", `&${query[0]}=${query[1]}`);
    }
  });

  return result;
};

module.exports = { sendResponse, getMinMax, getQueryString };
