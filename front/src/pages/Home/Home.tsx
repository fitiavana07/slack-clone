import React from 'react'
import { Redirect } from 'react-router-dom'

const Home: React.FC = () => {
  // TODO change to detect cookies
  return <Redirect to="/login" />
}
export default Home
