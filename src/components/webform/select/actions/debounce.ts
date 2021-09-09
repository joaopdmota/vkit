let timeout = 0

const debounce = (fnCallback: Function, delay: number = 500): void => {
  clearTimeout(timeout)

  timeout = setTimeout(fnCallback, delay)
}

export default debounce
