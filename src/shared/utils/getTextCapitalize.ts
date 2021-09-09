function getTextCapitalize(text: string): string {
  return text?.replace(/(^\w|\s\w)/g, (str) => str.toUpperCase()) || ''
}

export default getTextCapitalize
