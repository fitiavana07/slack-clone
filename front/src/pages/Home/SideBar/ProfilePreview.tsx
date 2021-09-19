import React, { FC } from 'react'
import { UserIcon } from '@heroicons/react/outline'

type ProfilePreviewProps = {
  fullName: string
  username: string
}

const ProfilePreview: FC<ProfilePreviewProps> = ({ fullName, username }) => (
  <div className="flex items-center px-4 -mx-2">
    <UserIcon className="mx-2 w-7 h-7" />
    <div className="mx-2">
      <p className="text-gray-800 dark:text-gray-200">{fullName}</p>
      <p className="text-sm font-semibold text-blue-900">{username}</p>
    </div>
  </div>
)

export default ProfilePreview
