import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'graphql-hooks'
import { Divider, Grid, Icon, Label, List, Popup, Segment } from 'semantic-ui-react'

import { LanguageContext } from '../../utilities'
import {
  GET_DATASETS_FROM_VARIABLE,
  getCreatedBy,
  getCreatedDate,
  getDescription,
  getName,
  getSubjectFields,
  getUnitTypeName,
  mapDatasetsByVariableIdResult,
  SSB_COLORS
} from '../../configurations'
import { SEARCH, SEARCH_VARIABLE, UI } from '../../enums'

function SearchResultVariable ({ variable }) {
  const { language } = useContext(LanguageContext)

  const [datasets, setDatasets] = useState([])
  const [datasetsOpen, setDatasetsOpen] = useState(false)

  const { loading, error, data } = useQuery(
    GET_DATASETS_FROM_VARIABLE,
    {
      variables: {
        id: variable.id
      }
    }
  )

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      setDatasets(mapDatasetsByVariableIdResult(data))
    }
  }, [error, loading, data])

  useEffect(() => {
    if (error && !loading) {
      console.log(error)
    }
  }, [error, loading])

  return (
    <Segment textAlign='left'>
      <Label ribbon size='large' style={{ backgroundColor: SSB_COLORS.BLUE, borderColor: SSB_COLORS.BLUE }}>
        {getUnitTypeName(language, variable)}
      </Label>
      <Grid columns='equal'>
        <Grid.Column>
          <Divider hidden />
          <List relaxed>
            <List.Item><b>{`${SEARCH_VARIABLE.NAME[language]}: `}</b>{getName(language, variable)}</List.Item>
            <List.Item>
              <b>{`${SEARCH_VARIABLE.DESCRIPTION[language]}: `}</b>{getDescription(language, variable)}
            </List.Item>
          </List>
          <Divider hidden />
          {getSubjectFields(language, variable)}
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
                  <b>{`${SEARCH_VARIABLE.DESCRIPTION[language]}: `}</b>{getDescription(language, dataset)}
                </List.Item>
                <List.Item>
                  <b>{`${SEARCH_VARIABLE.DATE_CREATED[language]}: `}</b>{getCreatedDate(language, dataset)}
                </List.Item>
                <List.Item>
                  <b>{`${SEARCH_VARIABLE.CREATED_BY[language]}: `}</b>{getCreatedBy(language, dataset)}
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
