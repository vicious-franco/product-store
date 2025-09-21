import React, { useContext } from "react";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdOutlineAddBox } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";
import { MyContext } from "../globalContext/Context";
import { Link } from "react-router-dom";

const Navigation = () => {
  const { toogleTheme, setToogleTheme } = useContext(MyContext);

  return (
    <section className="text-white p-4 md:py-10 md:px-20">
      <nav className="flex items-center justify-between">
        <div
          className={`flex text-nowrap items-center gap-2 text-xl sm:text-2xl xl:4xl font-bold uppercase  ${
            toogleTheme ? "text-cyan-600" : "text-cyan-400"
          }`}
        >
          <Link to="/">Product Store</Link>
          <span>
            <MdLocalGroceryStore />
          </span>
        </div>
        <div
          className={`${
            toogleTheme ? "text-black/80" : "text-white"
          } flex items-center gap-3 duration-500`}
        >
          <Link
            to="/create_product"
            className={`sm:text-2xl text-xl sm:p-3 p-2 rounded-md cursor-pointer hover:bg-blue-500/10 transition-colors ease-in-out duration-600 ${
              toogleTheme ? "bg-black/10" : "bg-white/20"
            }`}
          >
            <MdOutlineAddBox />
          </Link>
          <span
            onClick={() => setToogleTheme((prev) => !prev)}
            className={`sm:text-2xl text-xl sm:p-3 p-2 rounded-md cursor-pointer hover:bg-blue-500/10 transition-colors ease-in-out duration-600 ${
              toogleTheme ? "bg-black/10" : "bg-white/20"
            }`}
          >
            <MdOutlineWbSunny />
          </span>
        </div>
      </nav>
    </section>
  );
};

export default Navigation;
