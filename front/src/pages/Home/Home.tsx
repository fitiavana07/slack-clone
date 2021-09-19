import React from 'react'
import { Redirect } from 'react-router-dom'
import { useCurrentUser } from 'services/user'
import SideBar from './SideBar'

const Home: React.FC = () => {
  const [currentUser, { loading: loadingCurrentUser }] = useCurrentUser()

  if (loadingCurrentUser) {
    return <p>Loading...</p>
  }
  if (!currentUser) {
    return <Redirect to="/login" />
  }

  return <SideBar />
}
export default Home
