import { User } from 'generated/graphql'
import { PartialChannel } from 'services/messages'

type SideBarProps = {
  dmUsers: User[]
  loadingDMUsers: boolean
  channels: PartialChannel[]
  loadingChannels: boolean
}

export default SideBarProps
