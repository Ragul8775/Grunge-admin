/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { ReactSortable } from "react-sortablejs";

const ProductForm = ({
  type,
  product,
  setProduct,
  submitting,
  handleSubmit,
}) => {
  console.log("Children:", product);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const uploadImage = async (ev) => {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("image", file);
      }
      setIsLoading(true);
      try {
        const response = await axios.post("/api/uploads", data);

        // Update the product images by adding new images to the existing ones
        setProduct((prevProduct) => {
          const updatedImages = [...prevProduct.images, ...response.data.links];
          console.log(updatedImages); // Log the combined image array for verification
          return { ...prevProduct, images: updatedImages };
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };
  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  const updateImagesOrder = (newOrder) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: newOrder.map((item) => item.src), // Assuming each item has a src attribute
    }));
  };
  if (!product.images) {
    return <div>Loading...</div>;
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col max-w-md sm:max-w-full gap-4">
        <h1 className=" font-oswald font-semibold tracking-wider text-2xl">
          {type} Product
        </h1>
        <div className="flex flex-col gap-1">
          <label>Product Name</label>
          <input
            type="text"
            placeholder="product name "
            value={product.title}
            onChange={(ev) =>
              setProduct({ ...product, title: ev.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Categories</label>
          <select
            value={product.category}
            onChange={(ev) =>
              setProduct({ ...product, category: ev.target.value })
            }
          >
            <option value="">UnCategorised</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.name}
                  {c.parent?.name ? `/${c.parent?.name}` : null}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <textarea
            placeholder="descption"
            value={product.description}
            onChange={(ev) =>
              setProduct({ ...product, description: ev.target.value })
            }
          ></textarea>
        </div>
        <div className="">
          <label>Photos</label>
          <div className="flex flex-wrap gap-2">
            <ReactSortable
              list={
                product.images.map((img, index) => ({
                  id: index,
                  src: img,
                })) || []
              }
              setList={updateImagesOrder}
              className="flex flex-wrap gap-2"
            >
              {product.images.map((image, index) => (
                <div key={index} className="h-24">
                  <img
                    src={image}
                    alt={`Product ${index}`}
                    className="rounded-lg"
                  />
                </div>
              ))}
            </ReactSortable>
            <div className="mb-2">
              <label className="w-24 h-24 cursor-pointer bg-gray-300 flex flex-col justify-center items-center gap-1  rounded-md  ">
                {isLoading ? (
                  <Loading type={"spin"} color={"#1a120b"} />
                ) : (
                  <div className="flex flex-col justify-center items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                      />
                    </svg>
                    <div>Upload</div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={uploadImage}
                    />
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>Price in (₹)</label>
          <input
            type="text"
            placeholder="price"
            value={product.price}
            onChange={(ev) =>
              setProduct({ ...product, price: ev.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>MRP(₹)</label>
          <input
            type="text"
            placeholder="price"
            value={product.mrp}
            onChange={(ev) => setProduct({ ...product, mrp: ev.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1 justify-center ">
          <label>Sizes and Quantities</label>
          {product.sizes?.map((size, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Size Label (e.g., S, M, L)`}
                value={size.sizeLabel}
                onChange={(e) => {
                  const newSizes = [...product.sizes];
                  newSizes[index].sizeLabel = e.target.value;
                  setProduct((prev) => ({ ...prev, sizes: newSizes }));
                }}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={size.quantity}
                onChange={(e) => {
                  const newSizes = [...product.sizes];
                  newSizes[index].quantity = e.target.valueAsNumber;
                  setProduct((prev) => ({ ...prev, sizes: newSizes }));
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const newSizes = [...product.sizes];
                  newSizes.splice(index, 1);
                  setProduct((prev) => ({ ...prev, sizes: newSizes }));
                }}
                className="btn-red"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setProduct((prev) => ({
                ...prev,
                sizes: Array.isArray(prev.sizes)
                  ? [...prev.sizes, { sizeLabel: "", quantity: 0 }]
                  : [{ sizeLabel: "", quantity: 0 }],
              }));
            }}
            className="btn-primary max-w-sm"
          >
            Add Size
          </button>
        </div>

        <div>
          <button
            type="submit"
            disabled={submitting}
            className="font-grunge w-28 btn-primary "
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
