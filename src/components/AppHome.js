import React, { useContext, useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Divider, Grid, Header, Icon, Search, Segment } from 'semantic-ui-react'

import { SearchResultVariable } from './search'
import { FULL_TEXT_SEARCH, mapSearchResult, splitSearchResult, SSB_COLORS } from '../configurations'
import { LanguageContext } from '../utilities'
import { SEARCH, UI } from '../enums'

function AppHome () {
  const { language } = useContext(LanguageContext)

  const [searched, setSearched] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchEdited, setSearchEdited] = useState(false)
  const [previousSearch, setPreviousSearch] = useState('')
  const [datasetResults, setDatasetResults] = useState([])
  const [variableResults, setVariableResults] = useState([])

  const [fetchResults, { loading, error, data }] = useManualQuery(
    FULL_TEXT_SEARCH,
    {
      variables: {
        text: searchValue
      }
    }
  )

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const results = splitSearchResult(mapSearchResult(data))

      setDatasetResults(results.datasets)
      setVariableResults(results.variables)
    }
  }, [error, loading, data])

  useEffect(() => {
    if (error && !loading) {
      console.log(error)
    }
  }, [error, loading])

  return (
    <Segment basic textAlign='center'>
      <Search
        size='huge'
        open={false}
        loading={loading}
        value={searchValue}
        placeholder={UI.SEARCH[language]}
        onSearchChange={(event, { value }) => {
          setSearchEdited(true)
          setSearchValue(value)
        }}
        onKeyPress={({ key }) => {
          if (key === 'Enter') {
            setSearched(true)
            setSearchEdited(false)
            setPreviousSearch(searchValue)
            // noinspection JSIgnoredPromiseFromCall
            fetchResults()
          }
        }}
      />
      {searched && searchEdited &&
      <>
        <Icon name='info circle' style={{ color: SSB_COLORS.BLUE }} />
        {SEARCH.EDITED[language]}
      </>
      }
      {searched && searchEdited && previousSearch !== '' &&
      <>
        {` (`}<i>{SEARCH.PREVIOUS[language]}</i>{`'`}<b>{previousSearch}</b>{`')`}<p>{SEARCH.NEW_SEARCH[language]}</p>
      </>
      }
      <Divider hidden />
      <Grid columns='equal'>
        <Grid.Column>
          <Header size='huge' content={SEARCH.DATASET_RESULTS[language]} />
          {datasetResults.length >= 1 ?
            <pre>{JSON.stringify(datasetResults, null, 2)}</pre>
            :
            searched ? UI.SEARCH_NO_RESULTS[language] : null
          }
        </Grid.Column>
        <Grid.Column>
          <Header size='huge' content={SEARCH.VARIABLE_RESULTS[language]} />
          {variableResults.length >= 1 ?
            variableResults.map(variable => <SearchResultVariable key={variable.id} variable={variable} />)
            :
            searched ? UI.SEARCH_NO_RESULTS[language] : null
          }
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default AppHome
