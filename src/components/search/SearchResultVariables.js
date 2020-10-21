import React, { useEffect, useState } from 'react'
import { Divider, Grid, Label, Segment } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import FilterWarning from './FilterWarning'
import CopyToClipboard from './CopyToClipboard'
import VariableInDatasetLookup from './VariableInDatasetLookup'
import { RESULTS } from '../../enums'

function SearchResultVariables ({ language, lineageUrl, variables, variableTypeFilter }) {
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
      {filteredVariables.map(variable => {
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
            <Divider hidden />
            <a href={`${lineageUrl}?id=${id}&type=${type}`} target='_blank' rel='noopener noreferrer'>
              Sporing
            </a>
          </Segment>
        )
      })}
    </>
  )
}

export default SearchResultVariables
