import React from 'react'
import { Accordion, Checkbox, Grid, List } from 'semantic-ui-react'

import { MODEL } from '../../configurations'
import { TEST_IDS, UI } from '../../enums'

function ConfigureSearch ({ datasetTypeFilter, searchDataset, resultAsBoxes, handleSearchDataset, handleDatasetTypeCheckbox, handleResultAsBoxes, variableTypeFilter, handleVariableTypeCheckbox, language }) {
  const panels = [
    {
      key: 1,
      title: UI.CONFIGURE_SEARCH[language],
      content: {
        content: (
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                {UI.SHOW_RESULTS_AS[language]}
              </Grid.Column>
              <Grid.Column>
                <List>
                  <List.Item>
                    <Checkbox
                      label={UI.BOXES[language]}
                      checked={resultAsBoxes}
                      onClick={() => handleResultAsBoxes(true)}
                    />
                  </List.Item>
                  <List.Item>
                    <Checkbox
                      label={UI.TABLE[language]}
                      checked={!resultAsBoxes}
                      onClick={() => handleResultAsBoxes(false)}
                    />
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {UI.SHOW_OF_TYPE('VARIABLES', language)[language]}
              </Grid.Column>
              <Grid.Column>
                <List>
                  {MODEL.VARIABLE_TYPES.map(variableType =>
                    <List.Item key={variableType}>
                      <Checkbox
                        label={variableType}
                        checked={variableTypeFilter.includes(variableType)}
                        onClick={() => handleVariableTypeCheckbox(variableTypeFilter.includes(variableType), variableType)}
                      />
                    </List.Item>
                  )}
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {UI.SEARCH_DATASETS[language]}
              </Grid.Column>
              <Grid.Column>
                <Checkbox
                  checked={searchDataset}
                  data-testid={TEST_IDS.SEARCH_DATASET_TOGGLE}
                  onClick={() => handleSearchDataset(!searchDataset)}
                />
              </Grid.Column>
            </Grid.Row>
            {searchDataset &&
            <Grid.Row>
              <Grid.Column>
                {UI.SHOW_OF_TYPE('DATASETS', language)[language]}
              </Grid.Column>
              <Grid.Column>
                <List>
                  {MODEL.DATASET_TYPES.map(datasetType =>
                    <List.Item key={datasetType}>
                      <Checkbox
                        label={datasetType}
                        checked={datasetTypeFilter.includes(datasetType)}
                        onClick={() => handleDatasetTypeCheckbox(datasetTypeFilter.includes(datasetType), datasetType)}
                      />
                    </List.Item>
                  )}
                </List>
              </Grid.Column>
            </Grid.Row>
            }
          </Grid>
        )
      }
    }
  ]

  return <Accordion defaultActiveIndex={-1} panels={panels} />
}

export default ConfigureSearch
