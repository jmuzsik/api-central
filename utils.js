const findDeep = (data, pathArr, fallback) => {
  const len = pathArr.length;
  for (let i = 0; i < len; i++) {
    let path = pathArr[i];
    if (
      Array.isArray(data[path]) ||
      findDeep.isObject(data[path]) ||
      typeof data[path] === 'string'
    ) {
      if (i === len - 1) {
        return data[path];
      }
      data = data[path];
    } else {
      return fallback;
    }
  }
};

findDeep.isObject = obj => obj && typeof obj === 'object';

module.exports = { findDeep };
