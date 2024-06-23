import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserInfo {
  id: string;
  usercode: string;
  password: string;
  checkoutNo: string;
}

export const UserContext = createContext<{
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}>({
  userInfo: {
    id: '',
    usercode: '',
    password: '',
    checkoutNo: '',
  },
  setUserInfo: () => null,
});

export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    usercode: '',
    password: '',
    checkoutNo: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoFromStorage = await AsyncStorage.getItem('users');
        if (userInfoFromStorage) {
          const parsedUserInfo = JSON.parse(userInfoFromStorage);
          setUserInfo(parsedUserInfo[0]);
        }
      } catch (error) {
        console.error('Error fetching user info from AsyncStorage:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
