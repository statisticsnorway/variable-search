import React from 'react'
import { Accordion, Checkbox, Grid, List } from 'semantic-ui-react'

import { API, MODEL } from '../../configurations'
import { UI } from '../../enums'

function ConfigureSearch ({ datasetTypeFilter, handleDatasetTypeCheckbox, chosenSearchMethod, handleSearchMethodCheckbox, variableTypeFilter, handleVariableTypeCheckbox, language }) {
  const panels = [
    {
      key: 1,
      title: UI.CONFIGURE_SEARCH[language],
      content: {
        content: (
          <Grid columns='equal'>
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
                {UI.SEARCH_METHOD[language]}
              </Grid.Column>
              <Grid.Column>
                <List>
                  {API.SEARCH_METHODS.map(searchMethod =>
                    <List.Item key={searchMethod}>
                      <Checkbox
                        label={searchMethod}
                        checked={searchMethod === chosenSearchMethod}
                        onClick={() => handleSearchMethodCheckbox(searchMethod)}
                      />
                    </List.Item>
                  )}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
      }
    }
  ]

  return <Accordion defaultActiveIndex={-1} panels={panels} />
}

export default ConfigureSearch
