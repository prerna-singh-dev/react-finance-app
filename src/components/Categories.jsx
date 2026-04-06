import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
} from "../features/category/categorySlice";
import EmojiTab from "./EmojiTab";

function Categories() {
  const categories = useSelector((state) => state.category.list);

  const [inputValues, setInputValues] = useState({
    name: "",
    icon: "",
    type: "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const inputNam = e.target.name;
    const inputVal = e.target.value.trim();
    checkValidation();
    setInputValues((prev) => ({ ...prev, [inputNam]: inputVal }));
  };

  const emojiChange = (emoji) => {
    setInputValues((prev) => ({ ...prev, icon: emoji }));
  };

  const resetFields = () => {
    setInputValues({
      name: "",
      icon: "",
      type: "",
    });
  };
  const checkValidation = () => {
    !inputValues.name.trim()
      ? setError("Please enter category name")
      : setError("");
    !inputValues.type.trim()
      ? setError("Please select category type")
      : setError("");
    !inputValues.icon.trim()
      ? setError("Please select category icon")
      : setError("");
  };

  const saveCategory = () => {
    checkValidation();
    if (error) return;
    dispatch(addCategory(inputValues));
    resetFields();
  };

  return (
    <section className="space-y-6">
      <header
        className="flex flex-col gap-3 rounded-2xl border border-slate-200
       bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="mt-1 text-xl font-semibold text-slate-900">
            Categories
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Categories help you understand your spending patterns at a glance.
            Create, edit, or manage categories to get better insights into your
            financial habits.
          </p>
        </div>
      </header>

      <ul className="grid gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {categories &&
          categories?.length > 0 &&
          categories.map((category) => (
            <li
              key={category.id}
              className="rounded-2xl  bg-gradient-to-bl from-pink-50 to-pink-200 p-4 shadow-sm flex-1 text-center mb-5 relative"
            >
              <p className="text-2xl">{category.icon}</p>
              <p className="my-2 text-base font-semibold text-slate-900">
                {category.name}
              </p>
              <span
                className="absolute right-2 top-2 text-xs cursor-pointer"
                onClick={() => dispatch(deleteCategory(category.id))}
              >
                🗑️
              </span>
            </li>
          ))}
      </ul>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="text-lg font-semibold text-slate-900">
            {false ? "Edit" : "Add New"} Category
          </div>
        </div>

        <form
          className="space-y-4 p-4 w-full"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="name"
                className="text-xs font-semibold text-slate-700 block"
              >
                Category
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={inputValues.name}
                onChange={handleInputChange}
                placeholder="Enter new category"
                className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm
                 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="text-xs font-semibold text-slate-700 block"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={inputValues.type}
                onChange={handleInputChange}
                className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm
                   focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
                required
              >
                <option value="">Select Type</option>
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700 block mb-3">
              Select Category Icon
            </p>
            <EmojiTab emojiChange={emojiChange} />
          </div>
          <p class="text-xs text-rose-600 font-bold">{error}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium
                 text-white shadow-sm ${
                   error
                     ? "cursor-not-allowed bg-gray-300"
                     : "bg-pink-700  hover:bg-pink-600"
                 }`}
              onClick={saveCategory}
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={resetFields}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Categories;
