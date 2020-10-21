import React from 'react'
import { List, Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText, getNestedObject } from '@statisticsnorway/dapla-js-utilities'

import CopyToClipboard from './CopyToClipboard'
import { GSIM } from '../../configurations'
import { RESULTS } from '../../enums'

function SearchResultDatasets ({ datasets, language }) {
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
            const { id, name, description, dataSourcePath, unitDataStructure } = values
            const variables = getNestedObject(unitDataStructure, [GSIM.LOGICAL_RECORDS])
              .map(entry => entry[GSIM.INSTANCE_VARIABLES])

            return (
              <Table.Row key={id}>
                <Table.Cell textAlign='center'>
                  <CopyToClipboard id={id} type={type} language={language} />
                </Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, name)}</Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, description)}</Table.Cell>
                <Table.Cell>{dataSourcePath}</Table.Cell>
                <Table.Cell>
                  {variables.length === 0 ? '-' :
                    <List bulleted>
                      {variables.map(records => records.map(variable => {
                          const { id, name, description } = variable

                          return (
                            <List.Item key={id}>
                              {getLocalizedGsimObjectText(language, name)}
                              <br />
                              <i>{getLocalizedGsimObjectText(language, description)}</i>
                            </List.Item>
                          )
                        }
                      ))}
                    </List>
                  }
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
