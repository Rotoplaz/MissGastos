import React from 'react'
import { ReminderForm } from '../reminders/components/ReminderForm'

export const createRemainder = () => {
  return (
    <ReminderForm reminder={null} />
  )
}

export default createRemainder;