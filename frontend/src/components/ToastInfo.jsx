import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { MyContext } from "../globalContext/Context";
import { motion } from "framer-motion";

const ToastInfo = () => {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const { setshowToast, toastMessage } = useContext(MyContext);
  const { message, color, Icon } = toastMessage;

  useEffect(() => {
    const timer = setTimeout(() => {
      setshowToast(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="fixed flex justify-center top-0 left-0 text-white z-30 w-full ">
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -200, duration: 0.6 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mt-10 bg-[#20315c] flex justify-between rounded-lg sm:max-w-[30em] w-full p-3 mx-8"
      >
        <div className="flex gap-3">
          <div>
            <span style={{ color: color }} className="text-green-600 text-3xl">
              <Icon />
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-gray-300  inline-block font-semibold capitalize text-lg">
              {message}
            </h1>
            <p className="text-sm text-gray-400 inline-block ">
              Today {hour}:{minutes} {12 >= hour ? "AM" : "PM"}
            </p>
          </div>
        </div>
        <div>
          <span
            onClick={() => setshowToast(false)}
            className="text-2xl hover:text-gray-200 cursor-pointer text-gray-300"
          >
            <IoClose />
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default ToastInfo;
