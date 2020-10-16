import React, { useEffect, useState } from 'react'
import { Divider, Grid, Label, Segment, Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText, InfoPopup } from '@statisticsnorway/dapla-js-utilities'

import FilterWarning from './FilterWarning'
import CopyToClipboard from './CopyToClipboard'
import VariableInDatasetLookup from './VariableInDatasetLookup'
import { RESULTS } from '../../enums'

function SearchResultVariables ({ language, resultAsBoxes, variables, variableTypeFilter }) {
  const [filteredVariables, setFilteredVariables] = useState(
    variables.filter(variable => variableTypeFilter.includes(Object.keys(variable)[0]))
  )

  useEffect(() => {
    setFilteredVariables(variables.filter(variable => variableTypeFilter.includes(Object.keys(variable)[0])))
  }, [variables, variableTypeFilter])

  return (
    <>
      {variableTypeFilter.length !== 3 &&
      <FilterWarning language={language} filtered={filteredVariables.length} total={variables.length} />
      }
      {resultAsBoxes ? filteredVariables.map(variable => {
          const type = Object.keys(variable)[0]
          const values = variable[type]
          const { id, name, description } = values

          return (
            <Segment key={id} raised>
              <Label ribbon color='blue'>
                {type}
              </Label>
              <Label attached='top right'>
                <CopyToClipboard id={id} type={type} language={language} />
              </Label>
              <Grid columns='equal'>
                <Grid.Column>
                  <Divider hidden style={{ marginBottom: 0 }} />
                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <b>{RESULTS.NAME[language]}</b>
                      </Grid.Column>
                      <Grid.Column width={12}>
                        {getLocalizedGsimObjectText(language, name)}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={4}>
                        <b>{RESULTS.DESCRIPTION[language]}</b>
                      </Grid.Column>
                      <Grid.Column width={12}>
                        {getLocalizedGsimObjectText(language, description)}
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Grid.Column>
                <Grid.Column>
                  <VariableInDatasetLookup id={id} type={type} language={language} />
                </Grid.Column>
              </Grid>
            </Segment>
          )
        })
        :
        <Table basic='very' selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing />
              <Table.HeaderCell>{RESULTS.NAME[language]}</Table.HeaderCell>
              <Table.HeaderCell>{RESULTS.DESCRIPTION[language]}</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredVariables.map(variable => {
              const type = Object.keys(variable)[0]
              const values = variable[type]
              const { id, name, description } = values

              return (
                <Table.Row key={id}>
                  <Table.Cell textAlign='center' collapsing>
                    <CopyToClipboard id={id} type={type} language={language} />
                  </Table.Cell>
                  <InfoPopup
                    text={type}
                    trigger={<Table.Cell>{getLocalizedGsimObjectText(language, name)}</Table.Cell>}
                  />
                  <InfoPopup
                    text={type}
                    trigger={<Table.Cell>{getLocalizedGsimObjectText(language, description)}</Table.Cell>}
                  />
                  <Table.Cell>
                    <VariableInDatasetLookup id={id} type={type} language={language} />
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      }
    </>
  )
}

export default SearchResultVariables
