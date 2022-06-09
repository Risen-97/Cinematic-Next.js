const truncateString = (text, len) => {
  return text.length > len ? text.slice(0, len) + "..." : text;
};

export default truncateString;
