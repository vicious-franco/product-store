import React, { useContext, useRef } from "react";
import { MyContext } from "../globalContext/Context";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TiWarning } from "react-icons/ti";

const CreatePage = () => {
  const { toogleTheme, formData, setFormData, setToastMessage, setshowToast } =
    useContext(MyContext);

  const formRef = useRef(null);

  const addData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/v1/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "failed to add product");
      }
      setFormData({ name: "", price: "", image: "" });

      // toast
      setToastMessage({
        message: "successfully added",
        color: "green",
        Icon: IoMdCheckmarkCircleOutline,
      });
      setshowToast(true);

      formRef.current?.reset();
    } catch (err) {
      setToastMessage({
        message: err.message,
        color: "#ef4444",
        Icon: TiWarning,
      });
      setshowToast(true);
    }
  };

  return (
    <section className="md:px-20 p-4">
      <div>
        <div className="mb-10 md:mb-7">
          <h1
            className={`capitalize  text-center text-3xl font-semibold ${
              toogleTheme ? "text-gray-600" : "text-gray-100"
            } `}
          >
            create new product
          </h1>
        </div>
        <form
          ref={formRef}
          className={` flex  flex-col m-auto max-w-[45em] p-5 gap-8 ${
            toogleTheme
              ? "text-black bg-gray-600/10 "
              : "text-gray-300 bg-gray-600/30"
          }`}
        >
          <input
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            name="name"
            type="text"
            className={`${
              toogleTheme ? "border-gray-400" : "border-gray-600"
            }  outline-none border py-2  px-3 rounded-s`}
            placeholder="Product Name"
          />
          <input
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            name="price"
            type="number"
            className={`${
              toogleTheme ? "border-gray-400" : "border-gray-600"
            } outline-none border py-2  px-3 rounded-sm`}
            placeholder="Price"
          />
          <input
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            name="image"
            type="text"
            className={`${
              toogleTheme ? "border-gray-400" : "border-gray-600"
            } outline-none border py-2  px-3 rounded-sm`}
            placeholder="Image Url"
          />
          <button
            onClick={addData}
            type="submit"
            className="bg-cyan-500 text-[#030712] rounded-md py-2 font-semibold hover:bg-cyan-400 duration-400 cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreatePage;
