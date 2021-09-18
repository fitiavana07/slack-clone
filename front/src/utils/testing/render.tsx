import React from 'react'

import { MockedProvider, MockedProviderProps } from '@apollo/client/testing'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { FC, ReactElement } from 'react'

const CustomRender = (
  ui: ReactElement,
  options?: CustomRenderOptions,
): RenderResult => {
  return render(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: (
      props: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    ) => <Providers {...props} {...options?.providersProps} />,
    ...options,
  })
}

export default CustomRender

const Providers: FC<ProvidersProps> = ({ children, apolloProviderMocks }) => {
  return (
    <MockedProvider mocks={apolloProviderMocks}>{children}</MockedProvider>
  )
}

type ProvidersProps = {
  apolloProviderMocks: MockedProviderProps['mocks']
}

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  providersProps?: ProvidersProps
}
