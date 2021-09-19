import React, { FC } from 'react'
import { AuthorViewProps } from './AuthorView.props'

const AuthorView: FC<AuthorViewProps> = ({ author, loading }) => {
  if (!author) {
    return <span className="text-gray-600">User not found</span>
  }

  if (loading) {
    return <span className="text-gray-400">Loading...</span>
  }

  return <span className="font-bold align-text-bottom">{author.fullName}</span>
}

export default AuthorView
