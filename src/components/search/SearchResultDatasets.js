import React, { useEffect, useState } from 'react'
import { Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import FilterWarning from './FilterWarning'
import { RESULTS } from '../../enums'

function SearchResultDatasets ({ datasets, datasetTypeFilter, language }) {
  const [filteredDatasets, setFilteredDatasets] = useState(
    datasets.filter(dataset => datasetTypeFilter.includes(Object.keys(dataset)[0]))
  )

  useEffect(() => {
    setFilteredDatasets(datasets.filter(dataset => datasetTypeFilter.includes(Object.keys(dataset)[0])))
  }, [datasets, datasetTypeFilter])

  return (
    <>
      {datasetTypeFilter.length !== 2 &&
      <FilterWarning language={language} filtered={filteredDatasets.length} total={datasets.length} />
      }
      <Table basic='very' selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>{RESULTS.NAME[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.DESCRIPTION[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.TYPE[language]}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredDatasets.map(dataset => {
            const type = Object.keys(dataset)[0]
            const values = dataset[type]
            const { id, name, description } = values

            return (
              <Table.Row key={id}>
                <Table.Cell>{getLocalizedGsimObjectText(language, name)}</Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, description)}</Table.Cell>
                <Table.Cell>{type}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default SearchResultDatasets
