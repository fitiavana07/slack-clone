import React, { FC } from 'react'
import H2 from 'components/H2'
import ChannelDiscussionLink from './ChannelDiscussionLink'
import Container from './Container'
import DMDiscussionLink from './DMDiscussionLink'
import GroupTitle from './GroupTitle'
import ProfilePreview from './ProfilePreview'
import SideBarProps from './SideBar.props'
import { Link } from 'react-router-dom'
import NewChannelButton from './NewChannelButton'

const SideBar: FC<SideBarProps> = ({
  dmUsers,
  loadingDMUsers,
  loadingChannels,
  channels,
  currentUser,
}) => {
  return (
    <Container>
      <Link to="/">
        <H2>Slack Clone</H2>
      </Link>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <div>
            <GroupTitle>
              Direct Messages {loadingDMUsers ? ' - Loading...' : ''}
            </GroupTitle>

            {dmUsers.map(({ id, username }) => (
              <DMDiscussionLink key={id} to={'/dm/' + id}>
                {username}
              </DMDiscussionLink>
            ))}
          </div>
          <hr className="my-4 dark:border-gray-600" />

          <div>
            <GroupTitle>
              Channels {loadingChannels ? ' - Loading...' : ''}
            </GroupTitle>
            {channels.map(({ id, name }) => (
              <ChannelDiscussionLink key={id} to={'/channel/' + id}>
                {name}
              </ChannelDiscussionLink>
            ))}

            <NewChannelButton />
          </div>
        </nav>

        <ProfilePreview
          fullName={currentUser.fullName}
          username={currentUser.username}
        />
      </div>
    </Container>
  )
}

export default SideBar
