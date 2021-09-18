import React from 'react'

type ActionButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { loading: boolean }

export default ActionButtonProps
