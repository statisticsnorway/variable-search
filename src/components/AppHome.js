import React, { useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Grid, Icon, Label, Menu, Search, Segment, Tab } from 'semantic-ui-react'
import { InfoText, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import { ConfigureSearch, SearchResultDatasets, SearchResultVariables } from './search'
import { splitSearchResult } from '../utilities'
import { FULL_TEXT_SEARCH } from '../queries'
import { MODEL } from '../configurations'
import { UI } from '../enums'

function AppHome ({ language }) {
  const [searched, setSearched] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchEdited, setSearchEdited] = useState(false)
  const [resultAsBoxes, setResultAsBoxes] = useState(true)
  const [searchDataset, setSearchDataset] = useState(false)
  const [previousSearch, setPreviousSearch] = useState('')
  const [datasetResults, setDatasetResults] = useState([])
  const [variableResults, setVariableResults] = useState([])
  const [variableTypeFilter, setVariableTypeFilter] = useState([MODEL.VARIABLE_TYPES[1]])

  const [fetchResults, { loading, error, data }] = useManualQuery(FULL_TEXT_SEARCH, { variables: { text: searchValue } })

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const searchResults = splitSearchResult(data, language)

      setDatasetResults(searchResults.datasets)
      setVariableResults(searchResults.variables)
    }
  }, [error, loading, data, language])

  const doSearch = () => {
    if (searchValue.length >= 1) {
      setSearched(true)
      setSearchEdited(false)
      setPreviousSearch(searchValue)
      // noinspection JSIgnoredPromiseFromCall
      fetchResults()
    }
  }

  const handleVariableTypeCheckbox = (includes, variableType) => {
    if (includes) {
      setVariableTypeFilter(variableTypeFilter.filter(element => element !== variableType))
    } else {
      setVariableTypeFilter(variableTypeFilter.concat([variableType]))
    }
  }

  const handleSearchDataset = value => setSearchDataset(value)

  const handleResultAsBoxes = value => setResultAsBoxes(value)

  const panes = [
    {
      menuItem: (
        <Menu.Item key='variables'>
          {UI.VARIABLES[language]}
          <Label style={{ background: SSB_COLORS.BLUE }}>
            {loading ? <Icon loading name='spinner' /> : variableResults.length}
          </Label>
        </Menu.Item>
      ),
      render: () => variableResults.length >= 1 ?
        <Tab.Pane as={Segment} basic style={{ border: 'none' }}>
          <SearchResultVariables
            language={language}
            variables={variableResults}
            resultAsBoxes={resultAsBoxes}
            variableTypeFilter={variableTypeFilter}
          />
        </Tab.Pane>
        : null
    },
    {
      menuItem: (
        <Menu.Item key='datasets'>
          {UI.DATASETS[language]}
          <Label style={{ background: SSB_COLORS.BLUE }}>
            {loading ? <Icon loading name='spinner' /> : datasetResults.length}
          </Label>
        </Menu.Item>
      ),
      render: () => datasetResults.length >= 1 ?
        <Tab.Pane as={Segment} basic style={{ border: 'none' }}>
          <SearchResultDatasets
            language={language}
            datasets={datasetResults}
          />
        </Tab.Pane>
        : null
    }
  ]

  return (
    <Grid>
      <Grid.Column width={3}>
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
        {searched && searchEdited && <InfoText text={UI.EDITED[language]} />}
        {searched && searchEdited && previousSearch !== '' &&
        <>
          {` '`}<b>{previousSearch}</b>{`'`}<p>{UI.NEW_SEARCH[language]}</p>
        </>
        }
        <ConfigureSearch
          language={language}
          resultAsBoxes={resultAsBoxes}
          searchDataset={searchDataset}
          variableTypeFilter={variableTypeFilter}
          handleResultAsBoxes={handleResultAsBoxes}
          handleSearchDataset={handleSearchDataset}
          handleVariableTypeCheckbox={handleVariableTypeCheckbox}
        />
      </Grid.Column>
      <Grid.Column width={13}>
        <Tab
          defaultActiveIndex={0}
          menu={{ secondary: true, pointing: true }}
          panes={searchDataset ? panes : [panes.shift()]}
        />
      </Grid.Column>
    </Grid>

  )
}

export default AppHome
