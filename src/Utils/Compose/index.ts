const Compose = (...funcs: Function[]) => {
  if (funcs.length === 0) {
    return (arg: any[]) => arg
  }
  
  if (funcs.length === 1) {
    return funcs[0]
  }
  
  return funcs.reduce((a: Function, b: Function) => (...args: Function[]) => a(b(...args)))
}
export default Compose
