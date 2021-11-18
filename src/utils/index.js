function isDateValid(date) {
  const regexp = new RegExp(/^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/);

  return regexp.test(date);
}

const _formatDate = (timestamp) => {
  return new Date(timestamp)
}

function getTime(time) {
  return _formatDate(time).getTime()
}

const transformTimestamp = (ex) => {
    ex.date = _formatDate(ex.date)
}

module.exports = {
  isDateValid,
  getTime,
  transformTimestamp
};
