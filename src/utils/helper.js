const checkInvalidParam = (param, res) => {
  if (!param) return res.status(404).json(response404);
};

module.exports = {
  checkInvalidParam,
};
