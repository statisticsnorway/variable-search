import React, { useContext } from 'react'
import { Table } from 'semantic-ui-react'

import {
  getDatasetCreatedDate,
  getDatasetState,
  getDatasetValuation,
  getDescription,
  getName,
  LanguageContext
} from '../../utilities'
import { VALUATION_COLORS } from '../../configurations'
import { DATASET } from '../../enums'

function SearchResultDatasets ({ datasets }) {
  const { language } = useContext(LanguageContext)

  return (
    <Table basic='very'>
      <Table.Header>
        <Table.Row>
          {Object.entries(DATASET.TABLE_HEADERS).map(([header, text]) =>
            <Table.HeaderCell key={header}>{text[language]}</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {datasets.map(({ node }) =>
          <Table.Row key={node.id}>
            <Table.Cell>{getName(language, node)}</Table.Cell>
            <Table.Cell>{getDescription(language, node)}</Table.Cell>
            <Table.Cell>{getDatasetState(node)}</Table.Cell>
            <Table.Cell>
              <span style={{ color: VALUATION_COLORS[getDatasetValuation(node)] }}>{getDatasetValuation(node)}</span>
            </Table.Cell>
            <Table.Cell>{getDatasetCreatedDate(language, node)}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default SearchResultDatasets
