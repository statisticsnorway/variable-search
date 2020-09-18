import React from 'react'
import { useManualQuery } from 'graphql-hooks'
import { render } from '@testing-library/react'

import VariableInDatasetReverseLookup from '../components/search/VariableInDatasetReverseLookup'
import { DATASETS_FROM_REVERSE } from '../queries'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { TEST_IDS } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'
import ReverseDatasetLookupResult from './test-data/ReverseDatasetLookupResult.json'
import userEvent from '@testing-library/user-event'

const { language } = TEST_CONFIGURATIONS
const datasetName = ReverseDatasetLookupResult[0].representedVariable.reverseInstanceVariableRepresentedVariable[0]
  .reverseLogicalRecordInstanceVariables[0].reverseUnitDataStructureLogicalRecords[0]
  .reverseUnitDataSetUnitDataStructure[0].name[0].languageText
const variableId = PersonSearchResult[0].representedVariable.id
const variableType = MODEL.VARIABLE_TYPES[1]
const fetchResults = jest.fn()

const setup = () => {
  const { getByTestId, getByText } = render(
    <VariableInDatasetReverseLookup id={variableId} type={variableType} language={language} />
  )

  return { getByTestId, getByText }
}

test('Loads', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: true, error: null, data: undefined }])

  setup()
})

test('Renders basics', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: ReverseDatasetLookupResult }])

  const { getByText } = setup()

  expect(useManualQuery).toHaveBeenCalledWith(DATASETS_FROM_REVERSE[variableType], { variables: { id: variableId } })

  expect(getByText(datasetName)).toBeInTheDocument()
})

test('Inflate test coverage by opening/closing accordion', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: [] }])

  const { getByTestId } = setup()

  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
  userEvent.click(getByTestId(TEST_IDS.DATASETS_ACCORDION_TOGGLE))
})
