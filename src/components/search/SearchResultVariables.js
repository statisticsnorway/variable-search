import React, { useEffect, useState } from 'react'
import { Divider, Grid, Label, Segment } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import FilterWarning from './FilterWarning'
import CopyToClipboard from './CopyToClipboard'
import VariableInDatasetLookup from './VariableInDatasetLookup'
import { GSIM } from '../../configurations'
import { RESULTS } from '../../enums'

function SearchResultVariables ({ language, variables, variableTypeFilter }) {
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

        let inheritsFrom = false
        let inheritsFromType = false

        if (type === GSIM.INSTANCE_VARIABLE) {
          inheritsFrom = getLocalizedGsimObjectText(language, values[GSIM.REPRESENTED_VARIABLE][GSIM.NAME])
          inheritsFromType = GSIM.REPRESENTED_VARIABLE
        }

        if (type === GSIM.REPRESENTED_VARIABLE) {
          inheritsFrom = getLocalizedGsimObjectText(language, values[GSIM.VARIABLE][GSIM.NAME])
          inheritsFromType = GSIM.VARIABLE
        }

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
                  {inheritsFrom &&
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <b>{RESULTS.INHERITS_FROM[language]}</b>
                    </Grid.Column>
                    <Grid.Column width={12}>
                      {`${inheritsFrom} (${inheritsFromType})`}
                    </Grid.Column>
                  </Grid.Row>
                  }
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <VariableInDatasetLookup id={id} type={type} language={language} />
              </Grid.Column>
            </Grid>
          </Segment>
        )
      })}
    </>
  )
}

export default SearchResultVariables
