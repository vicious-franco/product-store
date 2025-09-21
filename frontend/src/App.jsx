import React, { useContext } from "react";
import HeroContent from "./components/HeroContent";
import { MyContext } from "./globalContext/Context";
import UpdateProduct from "./pages/UpdatePage";
import ToastInfo from "./components/ToastInfo";

const App = () => {
  const { toogleTheme, showToast } = useContext(MyContext);

  return (
    <main
      className={`${
        toogleTheme ? "bg-[#ebf3ff]" : "bg-[#030712]"
      } min-h-screen w-screen relative`}
    >
      <HeroContent />
      {showToast ? <ToastInfo /> : null}
    </main>
  );
};

export default App;
