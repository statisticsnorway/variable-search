import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'graphql-hooks'

import { LanguageContext } from '../../utilities'
import { GET_DATASETS_FROM_VARIABLE, mapDatasetsByVariableIdResult } from '../../configurations'
import { UI } from '../../enums'

function SearchResultVariable ({ variable }) {
  const { language } = useContext(LanguageContext)

  const [datasets, setDatasets] = useState([])

  const { loading, error, data } = useQuery(GET_DATASETS_FROM_VARIABLE, {
    variables: {
      id: variable.id
    }
  })

  useEffect(() => {
    if (!error && !loading && data !== undefined) {
      console.log(data)

      setDatasets(mapDatasetsByVariableIdResult(data))
    }
  }, [error, loading, data])

  return (
    <>
      {datasets.length >= 1 ?
        datasets.map(dataset => <pre>{JSON.stringify(dataset, null, 2)}</pre>)
        :
        UI.SEARCH_NO_RESULTS[language]
      }
    </>
  )
}

export default SearchResultVariable
