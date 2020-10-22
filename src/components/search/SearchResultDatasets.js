import React from 'react'
import { Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import CopyToClipboard from './CopyToClipboard'
import { RESULTS } from '../../enums'

function SearchResultDatasets ({ datasets, lineageUrl, language }) {
  return (
    <>
      <Table basic='very' selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell collapsing />
            <Table.HeaderCell>{RESULTS.NAME[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.DESCRIPTION[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.DATA_SOURCE_PATH[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.VARIABLES_IN_DATASET[language]}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {datasets.map(dataset => {
            const type = Object.keys(dataset)[0]
            const values = dataset[type]
            const { id, name, description, dataSourcePath } = values

            return (
              <Table.Row key={id}>
                <Table.Cell textAlign='center'>
                  <CopyToClipboard id={id} type={type} language={language} />
                </Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, name)}</Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, description)}</Table.Cell>
                <Table.Cell>{dataSourcePath}</Table.Cell>
                <Table.Cell>
                  <a href={`${lineageUrl}?id=${id}&type=dataset`} target='_blank' rel='noopener noreferrer'>
                    Sporing
                  </a>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )
}

export default SearchResultDatasets
