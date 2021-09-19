import React, { FC, useCallback } from 'react'
import { UserIcon } from '@heroicons/react/outline'
import { clearAccessToken } from 'services/user/accessToken'

type ProfilePreviewProps = {
  fullName: string
  username: string
}

const ProfilePreview: FC<ProfilePreviewProps> = ({ fullName, username }) => {
  const signout = useCallback(() => {
    clearAccessToken()
    window.location.reload()
  }, [])

  return (
    <div className="flex flex-col mt-12 bg-white rounded-md">
      <div className="flex items-center py-4">
        <UserIcon className="mx-4 w-7 h-7" />
        <div className="mx-2">
          <p className="text-gray-900">{fullName}</p>
          <p className="text-sm font-semibold text-blue-900">{username}</p>
        </div>
      </div>
      <button
        className="w-full px-4 py-2 text-sm font-semibold text-gray-700 uppercase bg-blue-100 rounded-md hover:bg-blue-200"
        onClick={signout}
      >
        Sign out
      </button>
    </div>
  )
}

export default ProfilePreview
