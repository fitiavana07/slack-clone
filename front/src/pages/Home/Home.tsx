import React, { useMemo } from 'react'
import { Redirect } from 'react-router-dom'
import { useChannels } from 'services/messages'
import { useCurrentUser, useUsers } from 'services/user'
import SideBar from './SideBar'

const Home: React.FC = () => {
  const [users, { loading: loadingDMUsers }] = useUsers()
  const [channels, { loading: loadingChannels }] = useChannels()

  const [currentUser, { loading: loadingCurrentUser }] = useCurrentUser()

  const dmUsers = useMemo(() => {
    if (!currentUser) {
      return users
    }
    return users.filter((u) => u.id !== currentUser.id)
  }, [users, currentUser])

  if (loadingCurrentUser) {
    return <p>Loading...</p>
  }
  if (!currentUser) {
    return <Redirect to="/login" />
  }

  // return <SideBar {...{ dmUsers }} />
  return (
    <SideBar
      loadingDMUsers={loadingDMUsers}
      dmUsers={dmUsers}
      channels={channels}
      loadingChannels={loadingChannels}
    />
  )
}
export default Home
