import React, { FC } from 'react'
import { UserIcon } from '@heroicons/react/outline'

type ProfilePreviewProps = {
  fullName: string
}

const ProfilePreview: FC<ProfilePreviewProps> = ({ fullName }) => (
  <div className="flex items-center px-4 -mx-2">
    <UserIcon className="mx-2 w-7 h-7" />
    <h4 className="mx-2 font-medium text-gray-800 dark:text-gray-200 hover:underline">
      {fullName}
    </h4>
  </div>
)

export default ProfilePreview
