import React from 'react'
import userEvent from '@testing-library/user-event'
import { useManualQuery } from 'graphql-hooks'
import { render } from '@testing-library/react'

import { AppHome } from '../components'
import { FULL_TEXT_SEARCH } from '../queries'
import { MODEL } from '../configurations'
import { TEST_CONFIGURATIONS } from '../configurations/TEST'
import { UI } from '../enums'

import PersonSearchResult from './test-data/PersonSearchResult.json'

jest.mock('../components/search/SearchResultDatasets', () => () => null)
jest.mock('../components/search/SearchResultVariables', () => () => null)

const { language } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn(), jest.fn())
const fetchResults = jest.fn()

const setup = () => {
  const { getByPlaceholderText, getByText } = render(
    <AppHome restApi={apiContext.restApi} language={language} />
  )

  return { getByPlaceholderText, getByText }
}

describe('Common mock', () => {
  useManualQuery.mockReturnValue([fetchResults, { loading: false, error: null, data: PersonSearchResult }])

  test('Search initiates and shows previous search', async () => {
    const { getByPlaceholderText, getByText } = setup()

    await userEvent.type(getByPlaceholderText(UI.SEARCH[language]), 'Person{enter}')

    expect(useManualQuery).toHaveBeenCalledWith(FULL_TEXT_SEARCH, { variables: { text: 'Person' } })

    await userEvent.type(getByPlaceholderText(UI.SEARCH[language]), 'Family')

    expect(getByText(UI.NEW_SEARCH[language])).toBeInTheDocument()
  })

  test('Sets filtering off/on', () => {
    const { getByText } = setup()

    userEvent.click(getByText(MODEL.VARIABLE_TYPES[0]))
    userEvent.click(getByText(MODEL.DATASET_TYPES[0]))

    userEvent.click(getByText(MODEL.VARIABLE_TYPES[0]))
    userEvent.click(getByText(MODEL.DATASET_TYPES[0]))
  })
})
