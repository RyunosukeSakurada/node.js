const mySum = (...args) => {
  return args.reduce((total, num) => total + num, 0);
}

module.exports = mySum;