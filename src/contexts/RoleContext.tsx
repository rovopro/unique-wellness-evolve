import { createContext, useContext, useState, ReactNode } from 'react';

export type AppRole = 'Admin' | 'Manager' | 'Analyst';

interface RoleContextType {
  role: AppRole;
  setRole: (role: AppRole) => void;
}

const RoleContext = createContext<RoleContextType>({ role: 'Admin', setRole: () => {} });

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<AppRole>('Admin');
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

export const useRole = () => useContext(RoleContext);
