import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addCategory,
  deleteCategory,
} from "../features/category/categorySlice";
import EmojiTab from "./EmojiTab";
import PageHeader from "./PageHeader";
import GlobalModal from "./GlobalModal";

function Categories() {
  const categories = useSelector((state) => state.category.list);

  const [inputValues, setInputValues] = useState({
    name: "",
    icon: "",
    type: "",
  });

  const [error, setError] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalPhase, setSuccessModalPhase] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pendingDeleteCategory = pendingDeleteId
    ? categories.find((c) => c.id === pendingDeleteId)
    : null;

  useEffect(() => {
    if (!showSuccessModal || successModalPhase !== "loading") return;
    const t = setTimeout(() => setSuccessModalPhase("done"), 900);
    return () => clearTimeout(t);
  }, [showSuccessModal, successModalPhase]);

  const handleInputChange = (e) => {
    const inputNam = e.target.name;
    let inputVal = e.target.value;

    if (inputNam === "name")
      inputVal = inputVal
        .trim()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    setInputValues((prev) => ({ ...prev, [inputNam]: inputVal }));
    setError("");
  };

  const emojiChange = (emoji) => {
    setInputValues((prev) => ({ ...prev, icon: emoji }));
    setError("");
  };

  const resetFields = () => {
    setInputValues({
      name: "",
      icon: "",
      type: "",
    });
    setError("");
  };

  const saveCategory = () => {
    const isFormInputEmpty = Object.values(inputValues).some(
      (item) =>
        item === null ||
        item === undefined ||
        (typeof item === "string" && item.trim() === ""),
    );

    const checkCategoryExist = categories.findIndex(
      (item) => item.name === inputValues.name,
    );

    if (isFormInputEmpty) {
      setError("Please fill all fields");
    } else {
      if (checkCategoryExist !== -1) {
        setError("Category Exist");
      } else {
        setError("");
        dispatch(addCategory(inputValues));
        resetFields();
        setSuccessModalPhase("loading");
        setShowSuccessModal(true);
      }
    }
  };

  const confirmDeleteCategory = () => {
    if (!pendingDeleteId) return;
    dispatch(deleteCategory(pendingDeleteId));
    setPendingDeleteId(null);
  };

  const closeSuccessGoAddTransaction = () => {
    setShowSuccessModal(false);
    setSuccessModalPhase("idle");
    navigate("/transactions/add");
  };

  const closeSuccessStay = () => {
    setShowSuccessModal(false);
    setSuccessModalPhase("idle");
  };

  const dismissSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessModalPhase("idle");
  };

  return (
    <section className="space-y-6">
      <PageHeader
        heading="Add and manage categories"
        subHeading="Categories"
        image="/categories.png"
      >
        <p className="mt-1 text-sm text-slate-600">
          Create new categories and view existing ones in one place. Organize
          your transactions for better financial tracking.
        </p>
      </PageHeader>

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
        {categories &&
          categories?.length > 0 &&
          categories.map((category) => (
            <li
              key={category.id}
              className="rounded-2xl bg-gradient-to-bl from-pink-50 to-pink-200 p-2.5 sm:p-3 lg:p-4 shadow-sm text-center relative mb-2 sm:mb-4 lg:mb-5"
            >
              <p className="text-xl sm:text-2xl leading-none">
                {category.icon}
              </p>
              <p
                className="mt-1 text-xs sm:my-2 sm:text-base font-semibold text-slate-900 truncate"
                title={category.name}
              >
                {category.name}
              </p>
              <button
                type="button"
                className="absolute right-1.5 top-1.5 text-[11px] lg:right-2 lg:top-2 lg:text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                onClick={() => setPendingDeleteId(category.id)}
                aria-label={`Delete ${category.name} category`}
              >
                🗑️
              </button>
            </li>
          ))}
      </ul>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4">
          <div className="text-lg font-semibold text-slate-900">
            Add New Category
          </div>
        </div>

        <form
          className="space-y-4 p-4 w-full"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Add new category"
        >
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
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
                className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm capitalize
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
            <h3 className="text-xs font-semibold text-slate-700 block mb-3">
              Select Category Icon
            </h3>
            <EmojiTab emojiChange={emojiChange} />
          </div>
          {error && (
            <p
              className="text-xs font-bold text-rose-600"
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-white shadow-sm ${
                error !== ""
                  ? "cursor-not-allowed bg-gray-300"
                  : "cursor-pointer bg-pink-700 hover:bg-pink-600"
              }`}
              onClick={saveCategory}
              aria-label="Save category"
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={resetFields}
              aria-label="Clear form"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <GlobalModal
          ariaLabel={
            successModalPhase === "loading"
              ? "Saving category"
              : "Category saved"
          }
          ariaBusy={successModalPhase === "loading"}
          onClose={dismissSuccessModal}
        >
          {successModalPhase === "loading" ? (
            <div className="flex flex-col items-center justify-center py-4">
              <img
                src="/categories.png"
                alt=""
                className="mx-auto h-20 w-auto animate-pulse drop-shadow-sm"
              />
              <div
                className="mt-5 h-9 w-9 rounded-full border-2 border-pink-100 border-t-pink-700 animate-spin"
                aria-hidden="true"
              />
              <p className="mt-5 text-sm font-medium text-slate-700">
                Saving your category…
              </p>
              <p className="mt-1 text-xs text-slate-500">Just a moment</p>
            </div>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-2xl text-emerald-600">
                ✓
              </div>
              <h2 className="text-center text-lg font-semibold text-slate-900">
                All set
              </h2>
              <p className="mt-2 text-center text-sm text-slate-600">
                Your category was added successfully.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={closeSuccessGoAddTransaction}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-pink-700 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-pink-600"
                >
                  Record a transaction
                </button>
                <button
                  type="button"
                  onClick={closeSuccessStay}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Add another category
                </button>
              </div>
            </>
          )}
        </GlobalModal>
      )}

      {pendingDeleteId && (
        <GlobalModal
          ariaLabel="Confirm delete category"
          onClose={() => setPendingDeleteId(null)}
        >
          <h2 className="text-center text-lg font-semibold text-slate-900">
            {pendingDeleteCategory?.name
              ? `Delete "${pendingDeleteCategory.name}"?`
              : "Delete this category?"}
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            This action can’t be undone.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => setPendingDeleteId(null)}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDeleteCategory}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-pink-700 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Delete
            </button>
          </div>
        </GlobalModal>
      )}
    </section>
  );
}

export default Categories;
