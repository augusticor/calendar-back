const isDate = (value) => {
  if (!value || isNaN(new Date(value))) return false;

  return true;
};

module.exports = { isDate };
