export default (...functions: Array<Function>) =>
  (value: any) =>
    functions.reduce(
      (currentValue: any, currentFunction: Function) => currentFunction(currentValue),
      value,
    )
