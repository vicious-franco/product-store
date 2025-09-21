import { createContext, useState } from "react";

export const MyContext = createContext();

export const ContextProvider = ({ children }) => {
  const [toogleTheme, setToogleTheme] = useState(false);
  const [formData, setFormData] = useState({});
  const [updatedData, setUpdatedData] = useState({});
  const [showToast, setshowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    message: "",
    color: "",
    Icon: "",
  });

  const contextData = {
    toogleTheme,
    setToogleTheme,
    formData,
    setFormData,
    updatedData,
    setUpdatedData,
    showToast,
    setshowToast,
    toastMessage,
    setToastMessage,
  };

  return (
    <MyContext.Provider value={contextData}>{children}</MyContext.Provider>
  );
};
