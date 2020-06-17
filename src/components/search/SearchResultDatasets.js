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
        {Object.entries(datasets).map(([id, dataset]) =>
          <Table.Row key={id}>
            <Table.Cell>{getName(language, dataset[0].node)}</Table.Cell>
            <Table.Cell>{getDescription(language, dataset[0].node)}</Table.Cell>
            <Table.Cell>{getDatasetState(dataset[0].node)}</Table.Cell>
            <Table.Cell>
              <span style={{ color: VALUATION_COLORS[getDatasetValuation(dataset[0].node)] }}>
                {getDatasetValuation(dataset[0].node)}
              </span>
            </Table.Cell>
            <Table.Cell>{getDatasetCreatedDate(language, dataset[0].node)}</Table.Cell>
            <Table.Cell>{`${dataset[0].cursor} (${dataset.length - 1})`}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default SearchResultDatasets
