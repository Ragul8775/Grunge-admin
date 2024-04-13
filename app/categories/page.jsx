"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

const Categories = ({ swal }) => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  const saveCategory = async (event) => {
    event.preventDefault();
    const data = { name, parentCategories };
    try {
      if (editedCategory) {
        editedCategory;

        const response = await axios.put(
          "/api/categories",
          { name, parentCategories, _id: editedCategory._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setEditedCategory(null);
      } else {
        const response = await axios.post("/api/categories", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resposeData = await response.data;
        console.log("Category saved:", resposeData);
      }
      setName("");
      setParentCategories("");
      fetchcategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };
  useEffect(() => {
    fetchcategories();
  }, []);
  const fetchcategories = () => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  };
  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategories(category?.parent?._id);
  };
  const deleteCategory = (category) => {
    swal
      .fire({
        title: "Are You Sure",
        text: `Do you want to delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`/api/categories/${category._id}`);
          fetchcategories();
        }
      })
      .catch((error) => {});
  };
  return (
    <Layout>
      <h1 className="text-2xl">Categories</h1>
      <label className="text-lg font-semibold">
        {editedCategory
          ? `Edit Categroy name: ${editedCategory.name}`
          : "Create new Category"}
      </label>
      <form onSubmit={saveCategory} className="flex gap-1 my-2 flex-wrap">
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          placeholder="Category Name"
        />
        <select
          value={parentCategories}
          onChange={(ev) => setParentCategories(ev.target.value)}
        >
          <option>No Parent Category</option>
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}{" "}
                {category.parent?.name ? `/${category.parent?.name}` : null}
              </option>
            ))}
        </select>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent Category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary py-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(category)}
                      className="btn-primary py-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
