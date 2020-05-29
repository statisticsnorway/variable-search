import React, { useContext, useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Checkbox, Divider, Grid, Header, Icon, Label, Loader, Search, Segment } from 'semantic-ui-react'

import { SearchResultDatasets, SearchResultVariable } from './search'
import { infoPopup, infoText, MODEL, SSB_COLORS } from '../configurations'
import { ApiContext, LanguageContext, splitSearchResult } from '../utilities'
import { SEARCH, UI } from '../enums'
import { FULL_TEXT_SEARCH } from '../queries'

function AppHome () {
  const { language } = useContext(LanguageContext)
  const { restApi } = useContext(ApiContext)

  const [searched, setSearched] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchEdited, setSearchEdited] = useState(false)
  const [previousSearch, setPreviousSearch] = useState('')
  const [datasetResults, setDatasetResults] = useState([])
  const [variableResults, setVariableResults] = useState([])
  const [variableFilter, setVariableFilter] = useState(MODEL.VARIABLES)

  const [fetchResults, { loading, error, data }] = useManualQuery(FULL_TEXT_SEARCH, { variables: { text: searchValue } })

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const searchResults = splitSearchResult(data)

      setDatasetResults(searchResults.datasets)
      setVariableResults(searchResults.variables)
    }
  }, [error, loading, data])

  useEffect(() => {
    if (error && !loading) {
      if (data !== undefined) {
        try {
          const searchResults = splitSearchResult(data)

          setDatasetResults(searchResults.datasets)
          setVariableResults(searchResults.variables)
        } catch (e) {
          console.log('Tried to extract query results from returned error but could not:')
          console.log(e)
        }
      }

      console.log(error)
    }
  }, [data, error, loading])

  const doSearch = () => {
    setSearched(true)
    setSearchEdited(false)
    setPreviousSearch(searchValue)
    // noinspection JSIgnoredPromiseFromCall
    fetchResults()
  }

  const handleCheckbox = (includes, variable) => {
    if (includes) {
      setVariableFilter(variableFilter.filter(element => element !== variable))
    } else {
      setVariableFilter(variableFilter.concat([variable]))
    }
  }

  const variablesList = variableResults.filter(variable => variableFilter.includes(variable.node[MODEL.TYPE[1]]))
    .map(variable => <SearchResultVariable key={variable.node.id} variable={variable.node} />)

  const variableSelect = MODEL.VARIABLES.map(variable =>
    <Checkbox
      key={variable}
      label={variable}
      style={{ marginRight: '2em' }}
      checked={variableFilter.includes(variable)}
      onClick={() => handleCheckbox(variableFilter.includes(variable), variable)}
    />
  )

  return (
    <Segment basic textAlign='center'>
      <Label attached='top right' style={{ background: 'transparent' }}>
        {infoPopup(
          UI.EXTERNAL_GRAPHIQL[language],
          <a href={`${restApi}/graphiql`} target='_blank' rel='noopener noreferrer'>
            <Icon link size='large' name='external' style={{ color: SSB_COLORS.BLUE }} />
          </a>,
          'bottom right'
        )}
      </Label>
      <Search
        size='huge'
        open={false}
        loading={loading}
        value={searchValue}
        placeholder={UI.SEARCH[language]}
        onKeyPress={({ key }) => key === 'Enter' && doSearch()}
        onSearchChange={(event, { value }) => {
          setSearchEdited(true)
          setSearchValue(value)
        }}
      />
      {searched && searchEdited && infoText(SEARCH.EDITED[language])}
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
            <SearchResultDatasets datasets={datasetResults} /> : searched ? UI.SEARCH_NO_RESULTS[language] : null
          }
        </Grid.Column>
        <Grid.Column>
          <Header size='huge' content={SEARCH.VARIABLE_RESULTS[language]} />
          {variableSelect}
          <Divider hidden />
          {loading ? <Loader active inline='centered' /> :
            variableResults.length >= 1 ? variablesList :
              searched ? UI.SEARCH_NO_RESULTS[language] :
                null
          }
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default AppHome
