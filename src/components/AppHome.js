import React, { useContext, useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Header, Input, Segment } from 'semantic-ui-react'

import { SearchResultVariable } from './search'
import { FULL_TEXT_SEARCH, mapSearchResult } from '../configurations'
import { LanguageContext } from '../utilities'
import { UI } from '../enums'

function AppHome () {
  const { language } = useContext(LanguageContext)

  const [searchValue, setSearchValue] = useState('')
  const [datasetResults, setDatasetResults] = useState([])
  const [variableResults, setVariableResults] = useState([])

  const [fetchResults, { loading, error, data }] = useManualQuery(FULL_TEXT_SEARCH, {
    variables: {
      text: searchValue
    }
  })

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      console.log(data)

      const results = mapSearchResult(data)

      setDatasetResults(results.filter(entry => entry.type !== 'RepresentedVariable'))
      setVariableResults(results.filter(entry => entry.type === 'RepresentedVariable'))
    }
  }, [error, loading, data])

  useEffect(() => {
    if (error && !loading) {
      console.log(error)
    }
  }, [error, loading])

  return (
    <Segment basic>
      <Input
        size='big'
        value={searchValue}
        error={!!error}
        disabled={loading}
        placeholder={UI.SEARCH[language]}
        onChange={(event, { value }) => setSearchValue(value)}
        onKeyPress={({ key }) => {
          if (key === 'Enter') {
            fetchResults()
          }
        }}
      />
      <Header content='Dataset results' />
      {datasetResults.length >= 1 ?
        <pre>{JSON.stringify(datasetResults, null, 2)}</pre>
        :
        UI.SEARCH_NO_RESULTS[language]
      }
      <Header content='Variable results' />
      {variableResults.length >= 1 ?
        variableResults.map(variable => <SearchResultVariable key={variable.id} variable={variable} />)
        :
        UI.SEARCH_NO_RESULTS[language]
      }
    </Segment>
  )
}

export default AppHome
