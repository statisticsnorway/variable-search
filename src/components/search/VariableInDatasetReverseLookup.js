import React, { useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Accordion, Icon, List } from 'semantic-ui-react'
import { getLocalizedGsimObjectText } from '@statisticsnorway/dapla-js-utilities'

import { DATASETS_FROM_REVERSE } from '../../queries'
import { MODEL } from '../../configurations'
import { TEST_IDS, UI } from '../../enums'

function VariableInDatasetReverseLookup ({ id, type, language }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [retrievedDatasets, setRetrievedDatasets] = useState([])

  const [fetchResults, { loading, error, data }] = useManualQuery(DATASETS_FROM_REVERSE[type], { variables: { id: id } })

  useEffect(() => {
    if (!loading && !error && data !== undefined) {
      const datasets = []

      if (Array.isArray(data) && data.length !== 0) {
        const reverseDatasets = data[0][type]
        const getDatasets = (reverseDatasets, i = 0) => {
          if (Array.isArray(reverseDatasets)) {
            if (reverseDatasets.length >= 1) {
              reverseDatasets.forEach(entry => getDatasets(entry, i))
            }
          } else {
            if (reverseDatasets.hasOwnProperty(MODEL.REVERSE[type][i])) {
              getDatasets(reverseDatasets[MODEL.REVERSE[type][i]], i + 1)
            }

            if (reverseDatasets.hasOwnProperty(MODEL.ID)) {
              datasets.push(reverseDatasets)
            }
          }
        }

        getDatasets(reverseDatasets)

        setRetrievedDatasets(datasets)
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

export default VariableInDatasetReverseLookup
