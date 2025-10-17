'use client';

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SettingsLayout from '@/components/settings/SettingsLayout';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsLayout />
    </ProtectedRoute>
  );
}
