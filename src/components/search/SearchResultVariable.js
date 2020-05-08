import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'graphql-hooks'
import { Divider, Grid, Icon, Label, List, Popup, Segment } from 'semantic-ui-react'

import {
  datasetsFromVariable,
  getDatasetCreatedDate,
  getDatasetState,
  getDatasetValuation,
  getDescription,
  getName,
  getVariableSubjectFields,
  getVariableUnitType,
  LanguageContext
} from '../../utilities'
import { MODEL, SSB_COLORS } from '../../configurations'
import { SEARCH, SEARCH_VARIABLE, UI } from '../../enums'
import { DATASETS_FROM } from '../../queries'

function SearchResultVariable ({ variable }) {
  const { language } = useContext(LanguageContext)

  const [datasets, setDatasets] = useState([])
  const [datasetsOpen, setDatasetsOpen] = useState(false)

  const { loading, error, data } = useQuery(
    DATASETS_FROM[variable[MODEL.TYPE[1]]],
    {
      variables: {
        id: variable.id
      }
    }
  )

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      setDatasets(datasetsFromVariable(data, variable[MODEL.TYPE[1]]))
    }
  }, [error, loading, data, variable])

  useEffect(() => {
    if (error && !loading) {
      console.log(error)
    }
  }, [error, loading])

  return (
    <Segment textAlign='left'>
      <Label ribbon size='large' style={{ backgroundColor: SSB_COLORS.BLUE, borderColor: SSB_COLORS.BLUE }}>
        {getVariableUnitType(language, variable, variable[MODEL.TYPE[1]])}
      </Label>
      <Grid columns='equal'>
        <Grid.Column>
          <Divider hidden />
          <List relaxed>
            <List.Item><b>{`${SEARCH_VARIABLE.TYPE[language]}: `}</b>{variable[MODEL.TYPE[1]]}</List.Item>
            <List.Item><b>{`${SEARCH_VARIABLE.NAME[language]}: `}</b>{getName(language, variable)}</List.Item>
            <List.Item>
              <b>{`${SEARCH_VARIABLE.DESCRIPTION[language]}: `}</b>{getDescription(language, variable)}
            </List.Item>
          </List>
          <Divider hidden />
          {getVariableSubjectFields(language, variable, variable[MODEL.TYPE[1]])}
        </Grid.Column>
        <Grid.Column>
          <Popup
            flowing
            hoverable
            position='left center'
            trigger={
              <Label floating onClick={() => setDatasetsOpen(!datasetsOpen)}>
                <Icon name={datasetsOpen ? 'minus circle' : 'plus circle'} />
              </Label>
            }
          >
            <>
              <Icon name='info circle' style={{ color: SSB_COLORS.BLUE }} />
              {SEARCH[datasetsOpen ? 'VARIABLE_DATASETS_CLOSED' : 'VARIABLE_DATASETS_OPEN'][language]}
            </>
          </Popup>
          {datasetsOpen ? datasets.length >= 1 ? datasets.map(dataset =>
              <List key={dataset.id} relaxed>
                <List.Item><b>{`${SEARCH_VARIABLE.NAME[language]}: `}</b>{getName(language, dataset)}</List.Item>
                <List.Item>
                  <b>{`${SEARCH_VARIABLE.DESCRIPTION[language]}: `}</b>
                  {getDescription(language, dataset)}
                </List.Item>
                <List.Item>
                  <b>{`${SEARCH_VARIABLE.DATASET_STATE[language]}: `}</b>
                  {getDatasetState(dataset)}
                </List.Item>
                <List.Item>
                  <b>{`${SEARCH_VARIABLE.DATASET_VALUATION[language]}: `}</b>
                  {getDatasetValuation(dataset)}
                </List.Item>
                <List.Item>
                  <b>{`${SEARCH_VARIABLE.DATE_CREATED[language]}: `}</b>{getDatasetCreatedDate(language, dataset)}
                </List.Item>
              </List>
            )
            :
            UI.SEARCH_NO_RESULTS[language]
            : null
          }
        </Grid.Column>
      </Grid>
      {datasetsOpen && datasets.length >= 1 && <Divider vertical><Icon name='arrow circle right' /></Divider>}
    </Segment>
  )
}

export default SearchResultVariable
