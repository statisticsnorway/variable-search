import React, { useContext, useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Checkbox, Divider, Grid, Header, Icon, Loader, Search, Segment } from 'semantic-ui-react'

import { SearchResultVariable } from './search'
import { MODEL, SSB_COLORS } from '../configurations'
import { LanguageContext, splitSearchResult } from '../utilities'
import { SEARCH, UI } from '../enums'
import { FULL_VARIABLE_TEXT_SEARCH } from '../queries'

function AppHome () {
  const { language } = useContext(LanguageContext)

  const [searched, setSearched] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchEdited, setSearchEdited] = useState(false)
  const [previousSearch, setPreviousSearch] = useState('')
  const [datasetResults, setDatasetResults] = useState([])
  const [variableResults, setVariableResults] = useState([])
  const [variableFilter, setVariableFilter] = useState(MODEL.VARIABLES)

  const [fetchResults, { loading, error, data }] = useManualQuery(
    FULL_VARIABLE_TEXT_SEARCH,
    {
      variables: {
        text: searchValue
      }
    }
  )

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const searchResults = splitSearchResult(data)

      setDatasetResults(searchResults.datasets)
      setVariableResults(searchResults.variables)
    }
  }, [error, loading, data])

  useEffect(() => {
    if (error && !loading) {
      console.log(error)
    }
  }, [error, loading])

  const handleCheckbox = (includes, variable) => {
    if (includes) {
      setVariableFilter(variableFilter.filter(element => element !== variable))
    } else {
      setVariableFilter(variableFilter.concat([variable]))
    }
  }

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
          {loading ? <Loader active inline='centered' /> : datasetResults.length >= 1 ?
            <pre>{JSON.stringify(datasetResults, null, 2)}</pre>
            :
            searched ? UI.SEARCH_NO_RESULTS[language] : null
          }
        </Grid.Column>
        <Grid.Column>
          <Header size='huge' content={SEARCH.VARIABLE_RESULTS[language]} />
          {MODEL.VARIABLES.map(variable =>
            <Checkbox
              key={variable}
              label={variable}
              style={{ marginRight: '2em' }}
              checked={variableFilter.includes(variable)}
              onClick={() => handleCheckbox(variableFilter.includes(variable), variable)}
            />
          )}
          {loading ? <Loader active inline='centered' /> : variableResults.length >= 1 ?
            variableResults.filter(variable => variableFilter.includes(variable.node[MODEL.TYPE[1]]))
              .map(variable => <SearchResultVariable key={variable.node.id} variable={variable.node} />)
            :
            searched ? UI.SEARCH_NO_RESULTS[language] : null
          }
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default AppHome
