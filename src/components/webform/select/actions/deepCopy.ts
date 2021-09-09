const deepCopy = (obj: any): any => JSON.parse(JSON.stringify(obj))

export default deepCopy
