module.exports = (complexityFilters, setComplexityFilters) => {
  return {
    pressed: (_complexity) => {
      const complexity = _complexity.toLowerCase();
      complexityFilters[complexity] = !complexityFilters[complexity];
      setComplexityFilters(complexityFilters);
  }
};
};
