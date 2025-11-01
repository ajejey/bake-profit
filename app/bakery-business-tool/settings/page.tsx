'use client'

import Settings from '../components/Settings'
import AppLayout from '../components/AppLayout'

export default function SettingsPage() {
  return (
    <AppLayout currentPage="settings">
      <Settings />
    </AppLayout>
  )
}
