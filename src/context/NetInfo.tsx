import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import NetInfo from '@react-native-community/netinfo';

interface NetInfoContextProps {
  isConnected: boolean | null;
}

const NetInfoContext = createContext<NetInfoContextProps>({
  isConnected: null,
});

export const useNetInfo = () => useContext(NetInfoContext);

interface NetInfoProviderProps {
  children: ReactNode;
}

export const NetInfoProvider: React.FunctionComponent<NetInfoProviderProps> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NetInfoContext.Provider value={{isConnected}}>
      {children}
    </NetInfoContext.Provider>
  );
};
