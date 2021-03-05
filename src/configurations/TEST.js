import { API } from './API'
import { LANGUAGE } from '@statisticsnorway/dapla-js-utilities'

const errorString = 'A problem occurred'

export const TEST_CONFIGURATIONS = {
  alternativeApi: 'http://localhost:9999',
  apiContext: (fn, fn2) => ({
    graphqlApi: `${window.__ENV.REACT_APP_API}${API.GRAPHQL}`,
    restApi: window.__ENV.REACT_APP_API,
    setRestApi: fn,
    setGraphqlApi: fn2
  }),
  errorString: errorString,
  errorObject: { response: { data: errorString } },
  language: LANGUAGE.LANGUAGES.NORWEGIAN.languageCode,
  otherLanguage: LANGUAGE.LANGUAGES.ENGLISH.languageCode
}
