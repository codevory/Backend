import { startups } from "../data/data.js";

export const getDataByPathParams = (req, res) => {
  let filteredData = startups;

  console.log(req.params);
  const { field, term } = req.params;
  const errorMessage = {
    message:
      "Search field not allowed. Please use only 'country', 'continent', 'industry'",
  };
  const allowedFields = ["country", "continent", "industry"];

  if (!allowedFields.includes(field)) {
    return res.status(400).json(errorMessage);
  }
  if (field && term) {
    filteredData = filteredData.filter(
      (d) => d[field].toLowerCase() === term.toLowerCase(),
    );
  }
  res.json(filteredData);
};
