import React, { useEffect, useState } from "react";
import { PiNotePencilBold } from "react-icons/pi";
import { FaRegTrashAlt } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../globalContext/Context";
import { TiWarning } from "react-icons/ti";
import { Link } from "react-router-dom";
import { RiDeleteBin3Fill } from "react-icons/ri";

const Products = () => {
  const { setshowToast, setToastMessage, toogleTheme } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const res = await fetch("/api/v1/products");
      if (!res.ok) {
        const err = await res.json();
        throw new Error("Error: " + err.message);
      }
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (deleteID) => {
    try {
      const res = await fetch(`/api/v1/products/${deleteID}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("failed to delete produc");
      }
      setProducts((prev) => prev.filter((item) => item._id !== deleteID));
      setToastMessage({
        message: "Delete Successfully",
        color: "#facc15",
        Icon: RiDeleteBin3Fill,
      });
      setshowToast(true);
    } catch (error) {
      setToastMessage({
        message: error.message,
        color: "#ef4444",
        Icon: TiWarning,
      });
      setshowToast(true);
    }
  };

  return (
    <section className="flex flex-col items-center mt-10 max-w-screen  ">
      <div
        className={` ${
          toogleTheme ? "text-cyan-600/80" : "text-cyan-400"
        } duration-400 text-2xl font-semibold flex items-center`}
      >
        <span className="inline-block">Current Products </span>
        <span className="inline-block text-3xl">
          <GiShoppingBag />
        </span>
      </div>
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 my-10 sm:grid-cols-2 lg:grid-cols-3 text-white gap-8 px-4">
          {products.map(({ _id, name, price, image }) => {
            return (
              <div
                key={_id}
                className={`  pb-3 rounded-md overflow-hidden  hover:-translate-y-3 ${
                  toogleTheme
                    ? "hover:shadow-[0px_6px_12px_rgba(0,0,0,0.5)] bg-cyan-950/80"
                    : "hover:shadow-[0px_3px_12px_rgb(0,211,243,0.4)] bg-cyan-950/32"
                } duration-600 ease-in-out`}
              >
                <img
                  className="sm:w-[24em] cursor-pointer w-full h-[18em] object-fit"
                  src={image}
                  alt=""
                />
                <div className="capitalize ml-3 mt-2 font-semibold text-gray-200">
                  <h1>{name.toLowerCase()}</h1>
                  <p>{price.toLocaleString()} Rwf</p>
                  <div className="flex items-center gap-3 text-lg mt-4">
                    <span
                      onClick={() => navigate(`/update/${_id}`)}
                      className="hover:bg-cyan-400 cursor-pointer bg-cyan-400/80 p-2 rounded-md"
                    >
                      <PiNotePencilBold />
                    </span>
                    <span
                      onClick={() => deleteProduct(_id)}
                      className="hover:bg-pink-400 cursor-pointer bg-pink-400/80 p-2 rounded-md"
                    >
                      <FaRegTrashAlt />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="text-gray-400 text-center font-semibold mt-10 text-lg">
            No Products Found 😢{" "}
            <Link
              to="/create_product"  
              className="text-cyan-600 cursor-pointer hover:underline"
            >
              Create a Product
            </Link>
          </p>
        </div>
      )}
    </section>
  );
};

export default Products;
