import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'graphql-hooks'
import { Container, Divider, Grid, Icon, Label, List, Segment } from 'semantic-ui-react'
import { InfoPopup, SSB_COLORS } from '@statisticsnorway/dapla-js-utilities'

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
import { MODEL } from '../../configurations'
import { SEARCH, SEARCH_VARIABLE, UI } from '../../enums'
import { DATASETS_FROM } from '../../queries'

function SearchResultVariable ({ id, variables }) {
  const { language } = useContext(LanguageContext)

  const [datasets, setDatasets] = useState([])
  const [datasetsOpen, setDatasetsOpen] = useState(false)

  const { loading, error, data } = useQuery(DATASETS_FROM[variables[0].node[MODEL.TYPE[1]]], { variables: { id: id } })

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      setDatasets(datasetsFromVariable(data, variables[0].node[MODEL.TYPE[1]]))
    }
  }, [error, loading, data, variables])

  useEffect(() => {
    if (error && !loading) {
      console.log(error)
    }
  }, [error, loading])

  return (
    <Segment textAlign='left'>
      <InfoPopup
        text={SEARCH_VARIABLE.UNIT_TYPE[language]}
        trigger={
          <Label ribbon size='large' style={{ backgroundColor: SSB_COLORS.BLUE, borderColor: SSB_COLORS.BLUE }}>
            {getVariableUnitType(language, variables[0].node[MODEL.TYPE[1]], variables[0].node)}
          </Label>
        }
      />
      <Grid columns='equal'>
        <Grid.Column>
          <Divider hidden />
          <List relaxed>
            <List.Item><b>{`${SEARCH_VARIABLE.TYPE[language]}: `}</b>{variables[0].node[MODEL.TYPE[1]]}</List.Item>
            <List.Item><b>{`${SEARCH_VARIABLE.NAME[language]}: `}</b>{getName(language, variables[0].node)}</List.Item>
            <List.Item>
              <b>{`${SEARCH_VARIABLE.DESCRIPTION[language]}: `}</b>{getDescription(language, variables[0].node)}
            </List.Item>
            {variables.length > 1 &&
            <List.Item>
              <b>{`${SEARCH_VARIABLE.UPDATES[language]}: ${variables.length - 1} `}</b>
              {`
              (${SEARCH_VARIABLE.CURSOR_OLDER[language]}:
              ${variables.map(variable => variable.cursor).filter((cursor, index) => index !== 0).join(', ')})
              `}
            </List.Item>
            }
          </List>
          <Divider hidden />
          <InfoPopup
            text={SEARCH_VARIABLE.SUBJECT_FIELDS[language]}
            trigger={
              <Container>
                {getVariableSubjectFields(language, variables[0].node[MODEL.TYPE[1]], variables[0].node)}
              </Container>
            }
          />
        </Grid.Column>
        <Grid.Column>
          <InfoPopup
            position='left center'
            text={SEARCH[`VARIABLE_DATASETS_${datasetsOpen ? 'CLOSED' : 'OPEN'}`][language]}
            trigger={
              <Label
                floating
                size='large'
                onClick={() => setDatasetsOpen(!datasetsOpen)}
                style={{ backgroundColor: SSB_COLORS.PURPLE, borderColor: SSB_COLORS.PURPLE }}
              >
                <Icon name={datasetsOpen ? 'minus circle' : 'plus circle'} />
              </Label>
            }
          />
          {datasetsOpen ? datasets.length >= 1 ? datasets.map(dataset =>
            <List key={dataset.id} relaxed>
              <List.Item><b>{`${SEARCH_VARIABLE.NAME[language]}: `}</b>{getName(language, dataset)}</List.Item>
              <List.Item><b>{`${SEARCH_VARIABLE.DESCRIPTION[language]}: `}</b>{getDescription(language, dataset)}
              </List.Item>
              <List.Item><b>{`${SEARCH_VARIABLE.DATASET_STATE[language]}: `}</b>{getDatasetState(dataset)}</List.Item>
              <List.Item><b>{`${SEARCH_VARIABLE.DATASET_VALUATION[language]}: `}</b>{getDatasetValuation(dataset)}
              </List.Item>
              <List.Item>
                <b>{`${SEARCH_VARIABLE.DATE_CREATED[language]}: `}</b>
                {getDatasetCreatedDate(language, dataset)}
              </List.Item>
            </List>
          ) : UI.SEARCH_NO_RESULTS[language] : null}
        </Grid.Column>
      </Grid>
      {datasetsOpen && datasets.length >= 1 && <Divider vertical><Icon name='arrow circle right' /></Divider>}
    </Segment>
  )
}

export default SearchResultVariable
