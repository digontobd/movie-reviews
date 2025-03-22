const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return "th"; // Covers 4-20
  const lastDigit = day % 10;
  return lastDigit === 1
    ? "st"
    : lastDigit === 2
    ? "nd"
    : lastDigit === 3
    ? "rd"
    : "th";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-BD", { month: "long" });
  const year = date.getFullYear();

  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};

export { formatDate };

export default formatDate;
