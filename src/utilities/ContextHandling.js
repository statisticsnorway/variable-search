import React, { useState } from 'react'

import { LANGUAGE } from '../enums'

export const ApiContext = React.createContext({
  graphqlApi: `${process.env.REACT_APP_API}/graphiql`,
  restApi: process.env.REACT_APP_API
})

export const LanguageContext = React.createContext(LANGUAGE.LANGUAGES.ENGLISH.languageCode)

export const AppContextProvider = (props) => {
  const [restApi, setRestApi] = useState(process.env.REACT_APP_API)
  const [language, setLanguage] = useState(LANGUAGE.LANGUAGES.ENGLISH.languageCode)
  const [graphqlApi, setGraphqlApi] = useState(`${process.env.REACT_APP_API}/graphiql`)

  return (
    <ApiContext.Provider value={{ graphqlApi, restApi, setGraphqlApi, setRestApi }}>
      <LanguageContext.Provider value={{ language, setLanguage }}>
        {props.children}
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )
}
