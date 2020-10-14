import React, { useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Grid, Icon, Label, Menu, Search, Segment, Tab } from 'semantic-ui-react'
import { InfoPopup, InfoText, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

import { ConfigureSearch, SearchResultDatasets, SearchResultLineage, SearchResultVariables } from './search'
import { splitSearchResult } from '../utilities'
import { FULL_TEXT_SEARCH } from '../queries'
import { API, MODEL } from '../configurations'
import { UI } from '../enums'

function AppHome ({ restApi, language }) {
  const [searched, setSearched] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchEdited, setSearchEdited] = useState(false)
  const [previousSearch, setPreviousSearch] = useState('')
  const [datasetResults, setDatasetResults] = useState([])
  const [variableResults, setVariableResults] = useState([])
  const [lineageFieldResults, setLineageFieldResults] = useState([])
  const [datasetTypeFilter, setDatasetTypeFilter] = useState(MODEL.DATASET_TYPES)
  const [variableTypeFilter, setVariableTypeFilter] = useState(MODEL.VARIABLE_TYPES)
  const [chosenSearchMethod, setChosenSearchMethod] = useState(API.SEARCH_METHODS[0])

  const [fetchResults, { loading, error, data }] = useManualQuery(FULL_TEXT_SEARCH, { variables: { text: searchValue } })

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      const searchResults = splitSearchResult(data)

      setDatasetResults(searchResults.datasets)
      setVariableResults(searchResults.variables)
      setLineageFieldResults(searchResults.lineageFields)
    }
  }, [error, loading, data])

  const doSearch = () => {
    if (searchValue.length >= 1) {
      setSearched(true)
      setSearchEdited(false)
      setPreviousSearch(searchValue)
      // noinspection JSIgnoredPromiseFromCall
      fetchResults()
    }
  }

  const handleDatasetTypeCheckbox = (includes, datasetType) => {
    if (includes) {
      setDatasetTypeFilter(datasetTypeFilter.filter(element => element !== datasetType))
    } else {
      setDatasetTypeFilter(datasetTypeFilter.concat([datasetType]))
    }
  }

  const handleVariableTypeCheckbox = (includes, variableType) => {
    if (includes) {
      setVariableTypeFilter(variableTypeFilter.filter(element => element !== variableType))
    } else {
      setVariableTypeFilter(variableTypeFilter.concat([variableType]))
    }
  }

  const handleSearchMethodCheckbox = searchMethod => setChosenSearchMethod(searchMethod)

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
            searchMethod={chosenSearchMethod}
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
            datasetTypeFilter={datasetTypeFilter}
          />
        </Tab.Pane>
        : null
    },
    {
      menuItem: (
        <Menu.Item key='lineageFields'>
          {UI.LINEAGE_FIELDS[language]}
          <Label style={{ background: SSB_COLORS.BLUE }}>
            {loading ? <Icon loading name='spinner' /> : lineageFieldResults.length}
          </Label>
        </Menu.Item>
      ),
      render: () => lineageFieldResults.length >= 1 ?
        <Tab.Pane as={Segment} basic style={{ border: 'none' }}>
          <SearchResultLineage
            language={language}
            lineageFields={lineageFieldResults}
          />
        </Tab.Pane>
        : null
    }
  ]

  return (
    <Grid>
      <Grid.Column width={3}>
        <Label attached='top right' style={{ background: 'transparent' }}>
          <InfoPopup
            position='right center'
            text={UI.EXTERNAL_GRAPHIQL[language]}
            trigger={
              <a href={`${restApi}${API.GRAPHIQL}`} target='_blank' rel='noopener noreferrer'>
                <Icon link size='large' name='external' style={{ color: SSB_COLORS.BLUE }} />
              </a>
            }
          />
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
        {searched && searchEdited && <InfoText text={UI.EDITED[language]} />}
        {searched && searchEdited && previousSearch !== '' &&
        <>
          {` (`}<i>{UI.PREVIOUS[language]}</i>{`'`}<b>{previousSearch}</b>{`')`}<p>{UI.NEW_SEARCH[language]}</p>
        </>
        }
        <ConfigureSearch
          language={language}
          datasetTypeFilter={datasetTypeFilter}
          variableTypeFilter={variableTypeFilter}
          chosenSearchMethod={chosenSearchMethod}
          handleDatasetTypeCheckbox={handleDatasetTypeCheckbox}
          handleVariableTypeCheckbox={handleVariableTypeCheckbox}
          handleSearchMethodCheckbox={handleSearchMethodCheckbox}
        />
      </Grid.Column>
      <Grid.Column width={13}>
        <Tab defaultActiveIndex={0} menu={{ secondary: true, pointing: true }} panes={panes} />
      </Grid.Column>
    </Grid>

  )
}

export default AppHome
