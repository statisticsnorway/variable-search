import React, { useEffect, useState } from 'react'
import { Popup, Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import FilterWarning from './FilterWarning'
import VariableInDatasetLookup from './VariableInDatasetLookup'
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
      <Table basic='very' selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{RESULTS.NAME[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.VARIABLE_IN_DATASETS[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.TYPE[language]}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredVariables.map(variable => {
            const type = Object.keys(variable)[0]
            const values = variable[type]
            const { id, name, description } = values

            return (
              <Table.Row key={id}>
                <Table.Cell>
                  <Popup
                    basic
                    flowing
                    size='large'
                    position='right center'
                    trigger={<span>{getLocalizedGsimObjectText(language, name)}</span>}>
                    {getLocalizedGsimObjectText(language, description)}
                  </Popup>
                </Table.Cell>
                <Table.Cell><VariableInDatasetLookup id={id} type={type} language={language} /></Table.Cell>
                <Table.Cell>{type}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default SearchResultVariables
