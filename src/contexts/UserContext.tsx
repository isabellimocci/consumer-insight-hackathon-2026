/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

import type { UserProfile } from '../types'

export const UserContext = createContext<UserProfile>({ name: 'Júlia', archetype: null })

export const useUser = () => useContext(UserContext)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<UserProfile>({ name: 'Júlia', archetype: null })
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
