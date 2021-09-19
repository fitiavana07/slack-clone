import H2 from 'components/H2'
import React, { FC } from 'react'
import ChannelDiscussionLink from './ChannelDiscussionLink'
import Container from './Container'
import DiscussionLink from './DiscussionLink'
import DMDiscussionLink from './DMDiscussionLink'
import GroupTitle from './GroupTitle'
import ProfilePreview from './ProfilePreview'

const SideBar: FC = () => {
  return (
    <Container>
      <H2>Slack Clone</H2>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <div>
            <GroupTitle>Direct Messages</GroupTitle>

            <DMDiscussionLink>Feno Andrianaly</DMDiscussionLink>
            <DMDiscussionLink>Settings</DMDiscussionLink>
          </div>
          <hr className="my-4 dark:border-gray-600" />

          <div>
            <GroupTitle>Channels</GroupTitle>

            <ChannelDiscussionLink>Group</ChannelDiscussionLink>
          </div>
        </nav>

        <ProfilePreview fullName={'Fitiavana Ramanandafy'} />
      </div>
    </Container>
  )
}

export default SideBar
