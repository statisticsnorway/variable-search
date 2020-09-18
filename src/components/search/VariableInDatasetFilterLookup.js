import React, { useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Accordion, Icon, List } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import { DATASETS_FROM_FILTER } from '../../queries'
import { MODEL } from '../../configurations'
import { TEST_IDS, UI } from '../../enums'

function VariableInDatasetFilterLookup ({ id, type, language }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [retrievedDatasets, setRetrievedDatasets] = useState([])

  const [fetchResults, { loading, error, data }] = useManualQuery(DATASETS_FROM_FILTER[type], { variables: { id: id } })

  useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data) && data.length !== 0) {
        setRetrievedDatasets(data.map(dataset => dataset[MODEL.DATASET_TYPES[1]]))
      }
    }
  }, [loading, error, data, type])

  const handleTitleClick = (e, { index }) => {
    if (activeIndex !== index) {
      // noinspection JSIgnoredPromiseFromCall
      fetchResults()
    }
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  const panels = [
    {
      key: 1,
      title: {
        content: '',
        'data-testid': TEST_IDS.DATASETS_ACCORDION_TOGGLE
      },
      content: {
        content: (
          loading ? <Icon loading name='spinner' /> : retrievedDatasets.length >= 1 ?
            <List>
              {retrievedDatasets.map(dataset => {
                const { id, name } = dataset

                return <List.Item key={id}>{getLocalizedGsimObjectText(language, name)}</List.Item>
              })}
            </List> : UI.NO_RESULTS[language]
        )
      }
    }
  ]

  return <Accordion activeIndex={activeIndex} panels={panels} onTitleClick={handleTitleClick} />
}

export default VariableInDatasetFilterLookup
