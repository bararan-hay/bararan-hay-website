export const normalizeKeyword = str => {
  return String(str)
    .trim()
    .replace(/[*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/և|եւ/g, '(և|եւ)');
};

export const getPatternRegExp = (path, word) => {
  const lastDotIndex = path.lastIndexOf('.');
  const type = path.substr(lastDotIndex + 1);
  const pattern = {
    tab: `^${word}.+`,
    txt: `^${word}.+`,
    babylon: `^(?:.+\\|\\s*)?${word}.*\n.+\n`
  };
  return new RegExp(pattern[type], 'mgi');
};

export const elasticSearch = (storage, keyword, maxCount) => {
  const array = [];
  storage.dictionaries.forEach(dictionary => {
    const word = normalizeKeyword(keyword);
    if (storage.checkedKeys[dictionary.key] && word) {
      const regexp = getPatternRegExp(dictionary.location, word);
      const lines = dictionary.data.match(regexp);
      if (lines) {
        const min = Math.min(lines.length, maxCount);
        array.push({
          name: `${dictionary.name} [${min}/${lines.length}]`,
          key: dictionary.key,
          lines: lines.slice(0, maxCount)
        });
      }
    }
  });
  return array;
};
