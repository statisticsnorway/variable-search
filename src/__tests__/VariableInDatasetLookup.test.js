import React from 'react'
import { useManualQuery } from 'graphql-hooks'
import { render } from '@testing-library/react'

import VariableInDatasetLookup from '../components/search/VariableInDatasetLookup'
import { DATASETS_FROM } from '../queries'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'

import PersonSearchResult from './test-data/PersonSearchResult.json'
import ReverseDatasetLookupResult from './test-data/ReverseDatasetLookupResult.json'

const { language } = TEST_CONFIGURATIONS
const datasetName = ReverseDatasetLookupResult[0].representedVariable.reverseInstanceVariableRepresentedVariable[0]
  .reverseLogicalRecordInstanceVariables[0].reverseUnitDataStructureLogicalRecords[0]
  .reverseUnitDataSetUnitDataStructure[0].name[0].languageText
const variableId = PersonSearchResult[0].representedVariable.id
const variableType = MODEL.VARIABLE_TYPES[1]
const fetchResults = jest.fn()

const setup = () => {
  const { getByText } = render(
    <VariableInDatasetLookup id={variableId} type={variableType} language={language} />
  )

  return { getByText }
}

test('Renders basics', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: ReverseDatasetLookupResult }])

  const { getByText } = setup()

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM[variableType], { variables: { id: variableId } })

  expect(getByText(datasetName)).toBeInTheDocument()
})
