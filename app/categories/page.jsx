"use client";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState("");
  console.log(categories);
  const saveCategory = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "/api/categories",
        { name, parentCategories },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log("Category saved:", data);
      setName("");
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

  return (
    <Layout>
      <h1 className="text-2xl">Categories</h1>
      <label className="text-lg font-semibold">Category Name</label>
      <form onSubmit={saveCategory} className="flex gap-1 my-2">
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
                {category.name}
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
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Categories;
