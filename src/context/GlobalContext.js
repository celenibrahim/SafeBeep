import React, {createContext, useState} from 'react';
export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({
    usercode:'',
    password:'',
    checkoutNo:'',
  });

  return (
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
};