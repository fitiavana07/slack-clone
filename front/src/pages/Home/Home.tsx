import H4 from 'components/H4'
import React, { useMemo } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { useChannels } from 'services/messages'
import { useCurrentUser, useUsers } from 'services/user'
import ChannelConversation from './Conversation/ChannelConversation'
import DMConversation from './Conversation/DMConversation'
import NewChannel from './NewChannel'
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
    <div className="flex flex-row">
      <SideBar
        loadingDMUsers={loadingDMUsers}
        dmUsers={dmUsers}
        channels={channels}
        loadingChannels={loadingChannels}
        currentUser={currentUser}
      />
      <Switch>
        <Route path="/dm/:destID">
          <DMConversation />
        </Route>
        <Route path="/channel/:channelID">
          <ChannelConversation />
        </Route>
        <Route path="/new-channel">
          <NewChannel />
        </Route>
        <Route path="/">
          <div className="flex flex-col w-full h-screen px-8 py-8">
            <H4>Welcome to Slack Clone</H4>
            <p>
              Open one of the <b className="font-semibold">conversations</b> in
              the sidebar and start sending messages.
            </p>
            <p>
              Only signed up users are listed in
              <b className="font-semibold">DIRECT MESSAGES</b>.
            </p>
            <p>
              Created channels are listed under{' '}
              <b className="font-semibold">CHANNELS</b>
            </p>
            <p className="mt-8 text-gray-500">
              Slack Clone made by{' '}
              <a
                className="font-semibold hover:underline"
                href="https://github.com/fitiavana07"
              >
                Fitiavana Ramanandafy
              </a>
            </p>
          </div>
        </Route>
      </Switch>
    </div>
  )
}
export default Home
