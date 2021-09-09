import { useHistory } from 'react-router-dom'

const useHistoryNavegation = (): {
  goBack: Function
  push: Function
} => {
  const history = useHistory()

  return {
    goBack: history.goBack,
    push: (to: string, transition?: string) =>
      history.push({
        pathname: to,
        state: {
          transitionName: transition,
        },
      }),
  }
}

export default useHistoryNavegation
