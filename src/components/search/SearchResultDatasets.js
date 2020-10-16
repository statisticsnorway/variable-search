import React from 'react'
import { List, Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText, getNestedObject } from '@statisticsnorway/dapla-js-utilities'

import CopyToClipboard from './CopyToClipboard'
import { VALUATION_COLORS } from '../../configurations'
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
            <Table.HeaderCell>{RESULTS.VALUATION[language]}</Table.HeaderCell>
            <Table.HeaderCell>{RESULTS.VARIABLES_IN_DATASET[language]}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {datasets.map(dataset => {
            const type = Object.keys(dataset)[0]
            const values = dataset[type]
            const { id, name, description, valuation, unitDataStructure } = values
            const something = getNestedObject(unitDataStructure, ['logicalRecords']).map(entry => entry['instanceVariables'])

            return (
              <Table.Row key={id}>
                <Table.Cell textAlign='center'>
                  <CopyToClipboard id={id} type={type} language={language} />
                </Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, name)}</Table.Cell>
                <Table.Cell>{getLocalizedGsimObjectText(language, description)}</Table.Cell>
                <Table.Cell><span style={{ color: VALUATION_COLORS[valuation] }}>{valuation}</span></Table.Cell>
                <Table.Cell>
                  {something.length === 0 ? '-' :
                    <List bulleted>
                      {something.map(thing => thing.map(thingy =>
                        <List.Item key={thingy.id}>
                          {getLocalizedGsimObjectText(language, thingy.name)}
                          <br />
                          <i>{getLocalizedGsimObjectText(language, thingy.description)}</i>
                        </List.Item>
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
