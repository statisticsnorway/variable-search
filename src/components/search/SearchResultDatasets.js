import React, { useEffect, useState } from 'react'
import { Grid, Header, List, Table } from 'semantic-ui-react'
import { getLocalizedGsimObjectText, getNestedObject } from '@statisticsnorway/dapla-js-utilities'

import CopyToClipboard from './CopyToClipboard'
import { VALUATION_COLORS } from '../../configurations'
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
          {filteredDatasets.map(dataset => {
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
                  <Grid columns='equal'>
                    <Grid.Column>
                      <Header size='small' content={RESULTS.DIRECT[language]} />
                      {something.length === 0 ? '-' :
                        <List relaxed>
                          {something.map(thing => thing.map(thingy =>
                            <List.Item key={thingy.id}>
                              <i><b>{getLocalizedGsimObjectText(language, thingy.name)}</b></i>
                              <p>{getLocalizedGsimObjectText(language, thingy.description)}</p>
                            </List.Item>
                          ))}
                        </List>
                      }
                    </Grid.Column>
                    <Grid.Column>
                      <Header size='tiny' content={RESULTS.LINEAGE[language]} />
                      -
                    </Grid.Column>
                  </Grid>
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
