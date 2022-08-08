module.exports = (complexityFilters, setComplexityFilters) => {
  return {
    pressed: (_complexity) => {
      const complexity = _complexity.toLowerCase();
      console.log(complexity);
      complexityFilters[complexity] = !complexityFilters[complexity];
      console.log(complexityFilters);
      setComplexityFilters(complexityFilters);
  }
};
};
