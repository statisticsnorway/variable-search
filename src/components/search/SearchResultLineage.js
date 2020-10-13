import React from 'react'
import { Table } from 'semantic-ui-react'

import CopyToClipboard from './CopyToClipboard'
import { RESULTS } from '../../enums'

function SearchResultLineage ({ language, lineageFields }) {
  return (
    <Table basic='very' selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>{RESULTS.NAME[language]}</Table.HeaderCell>
          <Table.HeaderCell>{RESULTS.LINEAGE_FIELD_IN_LINEAGE_DATASETS[language]}</Table.HeaderCell>
          <Table.HeaderCell>{RESULTS.RELATION_TYPE[language]}</Table.HeaderCell>
          <Table.HeaderCell>{RESULTS.CONFIDENCE[language]}</Table.HeaderCell>
          <Table.HeaderCell>{RESULTS.INSTANCE_VARIABLE[language]}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {lineageFields.map(lineageField => {
          const type = Object.keys(lineageField)[0]
          const { id, name, confidence, relationType, lineageDataset, instanceVariable } = lineageField[type]

          return (
            <Table.Row key={id}>
              <Table.Cell textAlign='center'>
                <CopyToClipboard id={id} type={type} language={language} />
              </Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>
                {lineageDataset !== null && lineageDataset !== undefined && lineageDataset.id}
              </Table.Cell>
              <Table.Cell>{relationType}</Table.Cell>
              <Table.Cell>{confidence}</Table.Cell>
              <Table.Cell>{instanceVariable !== null && instanceVariable !== undefined && instanceVariable.toString()}</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </Table>
  )
}

export default SearchResultLineage
