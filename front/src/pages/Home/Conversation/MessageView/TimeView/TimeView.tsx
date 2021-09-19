import React, { FC, useMemo } from 'react'
import { TimeViewProps } from './TimeView.props'
import moment from 'moment'

const TimeView: FC<TimeViewProps> = ({ time }) => {
  const shownTime = useMemo<string>(() => {
    return moment(time).format('hh:mm A')
  }, [time])
  return <span className="mx-2 text-sm text-gray-500">{shownTime}</span>
}

export default TimeView
