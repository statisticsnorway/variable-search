import React, { useEffect, useState } from 'react'
import { useManualQuery } from 'graphql-hooks'
import { Accordion, Icon, List } from 'semantic-ui-react'

import DatasetModal from './DatasetModal'
import { DATASETS_FROM_LINEAGE } from '../../queries'
import { drillVariables } from '../../utilities'
import { RESULTS, TEST_IDS, UI } from '../../enums'

function VariableInDatasetLookup ({ id, type, language }) {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [retrievedDatasets, setRetrievedDatasets] = useState([])

  const [fetchResults, {
    loading,
    error,
    data
  }] = useManualQuery(DATASETS_FROM_LINEAGE(type), { variables: { id: id } })

  useEffect(() => {
    if (!loading && !error && data !== undefined) {
      if (Array.isArray(data) && data.length !== 0) {
        const datasets = drillVariables(data, type)
        const filteredDatasets = datasets.filter((dataset, index, a) => a.findIndex(t => (t.id === dataset.id)) === index)

        if (datasets.length !== filteredDatasets.length) {
          console.log('Unfiltered datasets')
          console.log(datasets)
        }

        setRetrievedDatasets(filteredDatasets)
      }
    }
  }, [loading, error, data, type, language])

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
        content: <b>{RESULTS.VARIABLE_IN_DATASETS[language]}</b>,
        'data-testid': TEST_IDS.DATASETS_ACCORDION_TOGGLE
      },
      content: {
        content: (
          loading ? <Icon loading name='spinner' /> : retrievedDatasets.length >= 1 ?
            <List bulleted relaxed style={{ padding: '0 1rem 1rem 1rem' }}>
              {retrievedDatasets.map(dataset =>
                <List.Item key={dataset.id} as='a'>
                  <DatasetModal dataset={dataset} language={language} />
                </List.Item>
              )}
            </List> : UI.NO_RESULTS[language]
        )
      }
    }
  ]

  return <Accordion activeIndex={activeIndex} panels={panels} onTitleClick={handleTitleClick} />
}

export default VariableInDatasetLookup
