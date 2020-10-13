import React, { useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Accordion, Icon, List } from 'semantic-ui-react'

import DatasetModal from './DatasetModal'
import { DATASETS_FROM_LINEAGE } from '../../queries'
import { MODEL } from '../../configurations'
import { RESULTS, TEST_IDS, UI } from '../../enums'

function VariableInDatasetLineageLookup ({ id, type, language }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [retrievedDatasets, setRetrievedDatasets] = useState([])

  const [fetchResults, { loading, error, data }] = useManualQuery(DATASETS_FROM_LINEAGE[type], { variables: { id: id } })

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
        content: RESULTS.LINEAGE[language],
        'data-testid': TEST_IDS.DATASETS_ACCORDION_TOGGLE
      },
      content: {
        content: (
          loading ? <Icon loading name='spinner' /> : retrievedDatasets.length >= 1 ?
            <List>
              {retrievedDatasets.map(dataset => {
                const { id } = dataset

                return (
                  <List.Item key={id} as='a'>
                    <DatasetModal dataset={dataset} language={language} />
                  </List.Item>
                )
              })}
            </List> : UI.NO_RESULTS[language]
        )
      }
    }
  ]

  return <Accordion activeIndex={activeIndex} panels={panels} onTitleClick={handleTitleClick} />
}

export default VariableInDatasetLineageLookup
