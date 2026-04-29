export function getFilteredData({ data, locationName, locationType }) {
  let errorMessage = {
    error: "not found",
    message: "The requested route does not exist",
  };
  return data.filter(
    (destination) =>
      destination[locationType].toLowerCase() === locationName.toLowerCase(),
  );
}
