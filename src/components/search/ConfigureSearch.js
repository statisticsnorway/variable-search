import React from 'react'
import { Accordion, Checkbox, Divider, Header, List } from 'semantic-ui-react'

import { MODEL } from '../../configurations'
import { TEST_IDS, UI } from '../../enums'

function ConfigureSearch ({ searchDataset, handleSearchDataset, variableTypeFilter, handleVariableTypeCheckbox, language }) {
  const panels = [
    {
      key: 1,
      title: UI.CONFIGURE_SEARCH[language],
      content: {
        content: (
          <>
            <Header size='tiny' content={UI.SHOW_OF_TYPE('VARIABLES', language)[language]} />
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
            <Divider hidden />
            <Header size='tiny' content={UI.OTHER[language]} />
            <Checkbox
              toggle
              checked={searchDataset}
              label={UI.SEARCH_DATASETS[language]}
              data-testid={TEST_IDS.SEARCH_DATASET_TOGGLE}
              onClick={() => handleSearchDataset(!searchDataset)}
            />
          </>
        )
      }
    }
  ]

  return <Accordion defaultActiveIndex={0} panels={panels} styled />
}

export default ConfigureSearch
