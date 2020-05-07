import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useAxios from 'axios-hooks'

import App from '../App'
import { AppContextProvider } from '../utilities'
import { API, TEST_CONFIGURATIONS } from '../configurations'
import { LANGUAGE, SETTINGS, TEST_IDS, UI } from '../enums'

jest.mock('../components/AppHome', () => () => null)

const { errorObject, language, otherLanguage } = TEST_CONFIGURATIONS

const setup = () => {
  const { getByTestId, getByText } = render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )

  return { getByTestId, getByText }
}

describe('Common mock', () => {
  useAxios.mockReturnValue([{ loading: false, error: null }])

  test('Renders basics', () => {
    const { getByText } = setup()

    expect(getByText(UI.HEADER[language])).toBeInTheDocument()
  })

  test('Change language works correctly', () => {
    const { getByText } = setup()

    userEvent.click(getByText(LANGUAGE.NORWEGIAN[language]))

    expect(getByText(UI.HEADER[otherLanguage])).toBeInTheDocument()
  })

  test('Opens settings', () => {
    const { getByTestId, getByText } = setup()

    userEvent.click(getByTestId(TEST_IDS.ACCESS_SETTINGS_BUTTON))

    expect(getByText(SETTINGS.HEADER[language])).toBeInTheDocument()
  })
})

test('Does not crash', () => {
  useAxios.mockReturnValue([{ loading: true, error: null }])
  setup()

  expect(useAxios).toHaveBeenCalledWith(`${process.env.REACT_APP_API}${API.GET_HEALTH}`)
})

test('Renders error when backend call returns error', () => {
  useAxios.mockReturnValue([{ loading: false, error: errorObject }])
  const { getByText } = setup()

  expect(getByText(UI.API_ERROR_MESSAGE[language])).toBeInTheDocument()
})