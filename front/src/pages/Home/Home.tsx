import React from 'react'
import { Redirect } from 'react-router-dom'
import { useCurrentUser } from 'services/user'

const Home: React.FC = () => {
  const [currentUser, { loading: loadingCurrentUser }] = useCurrentUser()

  if (loadingCurrentUser) {
    return <p>Loading...</p>
  }

  if (!currentUser) {
    return <Redirect to="/login" />
  }
  return <p>hey</p>
}
export default Home
