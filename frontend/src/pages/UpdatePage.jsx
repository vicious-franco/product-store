  import React from "react";
  import { IoClose } from "react-icons/io5";
  import { MyContext } from "../globalContext/Context";
  import { useNavigate } from "react-router-dom";
  import { useParams } from "react-router-dom";
  import { useEffect, useState, useContext } from "react";
  import { GrUpdate } from "react-icons/gr";
  import { TiWarning } from "react-icons/ti";

  const UpdatePage = () => {
    const {
      updatedData,
      setUpdatedData,
      setshowToast,
      toogleTheme,
      setToastMessage,
    } = useContext(MyContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [Product, setProduct] = useState({
      name: "",
      price: "",
      image: "",
    });

    const getSingleProduct = async (productId) => {
      try {
        const res = await fetch(`/api/v1/products/${productId}`, {
          method: "GET",
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "failed to get product");
        }
        const data = await res.json();
        setProduct(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    useEffect(() => {
      getSingleProduct(id);
    }, [id]);

    const handleUpdate = async (id, newProduct) => {
      try {
        const res = await fetch(`/api/v1/products/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct),
        });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "failed to update product");
        }
        const data = await res.json();
        setToastMessage({
          message: data.message || "update successfully",
          color: "#22c55e",
          Icon: GrUpdate,
        });
        setshowToast(true);
      } catch (err) {
        setToastMessage({
          message: err.message,
          color: "#facc15",
          Icon: TiWarning,
        });
        setshowToast(true);
      }
    };
    return (
      <section className="h-full w-screen bg-transparent  text-white ">
        <div className="flex  justify-center ">
          <div
            className={`mt-30 ${
              toogleTheme ? "bg-gray-600/30" : "bg-gray-800"
            } max-w-[30em] mx-3  w-full px-5 pb-6`}
          >
            <div className="flex items-center justify-between my-4">
              <h1
                className={`text-xl font-semibold ${
                  toogleTheme ? "text-cyan-600" : "text-gray-300"
                }`}
              >
                Update Product
              </h1>
              <span
                onClick={() => navigate("/")}
                className="text-2xl text-gray-400 hover:text-gray-300 cursor-pointer"
              >
                <IoClose />
              </span>
            </div>
            <form className="flex flex-col text-gray-300 gap-4">
              <input
                value={updatedData.name ?? Product.name}
                name="name"
                onChange={(e) =>
                  setUpdatedData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                className={`border ${
                  toogleTheme
                    ? "border-cyan-950/30 text-gray-100"
                    : "border-gray-600"
                } rounded-sm px-2 py-1 outline-none`}
                type="text"
                placeholder="Product Name"
              />
              <input
                name="price"
                value={updatedData.price ?? Product.price}
                onChange={(e) =>
                  setUpdatedData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                className={`border ${
                  toogleTheme
                    ? "border-cyan-950/30 text-gray-100"
                    : "border-gray-600"
                } rounded-sm px-2 py-1 outline-none`}
                type="text"
                placeholder="Price"
              />
              <input
                name="image"
                value={updatedData.image ?? Product.image}
                onChange={(e) =>
                  setUpdatedData((prev) => {
                    return { ...prev, [e.target.name]: e.target.value };
                  })
                }
                className={`border ${
                  toogleTheme
                    ? "border-cyan-950/30 text-gray-100"
                    : "border-gray-600"
                } rounded-sm px-2 py-1 outline-none`}
                type="text"
                placeholder="Image Url"
              />
            </form>
            <div className="flex justify-end">
              <div className="mt-5 flex gap-4">
                <button
                  onClick={async() => {
                    setUpdatedData({ name: "", price: "", image: "" });
                    await handleUpdate(id, updatedData);
                    navigate("/");

                  }}
                  className={`px-2 py-1 cursor-pointer rounded-md ${
                    toogleTheme ? "bg-cyan-600/70" : "bg-cyan-400/70"
                  } hover:bg-cyan-400/90 duration-300`}
                >
                  Update
                </button>
                <button
                  onClick={()=>navigate("/")}
                  className="px-2 py-1 cursor-pointer rounded-md bg-gray-700 hover:bg-gray-600 duration-300 "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  export default UpdatePage;
