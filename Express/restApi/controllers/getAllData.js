import { startups } from "../data/data.js";

export const getAllData = (req, res) => {
  let filteredData = startups;
  const { industry, country, continent, is_seeking_funding, has_mvp } =
    req.query;
  if (industry) {
    filteredData = filteredData.filter(
      (d) => d.industry.toLowerCase() === industry.toLowerCase(),
    );
  }
  if (country) {
    filteredData = filteredData.filter(
      (d) => d.country.toLowerCase() === country.toLowerCase(),
    );
  }
  if (continent) {
    filteredData = filteredData.filter(
      (d) => d.continent.toLowerCase() === continent.toLowerCase(),
    );
  }
  if (is_seeking_funding) {
    filteredData = filteredData.filter(
      (d) => d.is_seeking_funding === Boolean(is_seeking_funding.toLowerCase()),
    );
  }
  if (has_mvp) {
    filteredData = filteredData.filter(
      (d) => d.has_mvp === Boolean(has_mvp.toLowerCase()),
    );
  }
  res.json(filteredData);
};
