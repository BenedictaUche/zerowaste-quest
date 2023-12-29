import { createContext, ReactNode, useContext, useState } from 'react';

interface UserContextProps {
  children: ReactNode;
}

interface UserData {
  username: string;
  email: string;
  fullName: string;
  goal: string;
  interest: string;
  avatar: string;
}

interface UserContextValue {
  user: UserData | null;
  username: string;
  email: string;
  setUser: (userData: UserData | null) => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [user, setUserState] = useState<UserData | null>(null);

  const setUser = (userData: UserData | null) => {
    setUserState(userData);
  };

  return (
    <UserContext.Provider value={{ user, username: user?.username || '', email: user?.email || '', setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
