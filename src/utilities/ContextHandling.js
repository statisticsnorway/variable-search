import React, { useState } from 'react'
import { ClientContext, GraphQLClient } from 'graphql-hooks'

import { API } from '../configurations'
import { LANGUAGE } from '../enums'

const graphqlClient = new GraphQLClient({
  url: `${process.env.REACT_APP_API}${API.GRAPHQL}`
})

export const ApiContext = React.createContext({
  graphqlApi: `${process.env.REACT_APP_API}${API.GRAPHQL}`,
  restApi: process.env.REACT_APP_API
})

export const LanguageContext = React.createContext(LANGUAGE.LANGUAGES.ENGLISH.languageCode)

export const AppContextProvider = (props) => {
  const [restApi, setRestApi] = useState(process.env.REACT_APP_API)
  const [language, setLanguage] = useState(LANGUAGE.LANGUAGES.ENGLISH.languageCode)
  const [graphqlApi, setGraphqlApi] = useState(`${process.env.REACT_APP_API}${API.GRAPHQL}`)

  return (
    <ClientContext.Provider value={graphqlClient}>
      <ApiContext.Provider value={{ graphqlApi, restApi, setGraphqlApi, setRestApi }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          {props.children}
        </LanguageContext.Provider>
      </ApiContext.Provider>
    </ClientContext.Provider>
  )
}
