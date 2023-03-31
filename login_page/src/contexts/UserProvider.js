import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from local storage if it exists
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const updateAndStoreUser = (newUser) => {
    setUser(newUser);
    // Store user data in local storage
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateAndStoreUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
