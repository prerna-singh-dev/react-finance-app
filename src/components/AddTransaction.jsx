import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  editTransaction,
} from "../features/transaction/transactionSlice";
import useFetchExpenses from "../hooks/useFetchExpenses";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageHeader from "./PageHeader";
import GlobalModal from "./GlobalModal";

function AddTransaction() {
  const categories = useSelector((state) => state.category.list);
  const transactions = useSelector((state) => state.transaction.list);

  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalPhase, setSuccessModalPhase] = useState("idle");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const isEditMode = Boolean(params.id);

  const [salary, expense, balance] = useFetchExpenses();
  const todayDate = new Date().toISOString().split("T")[0];
  let transactionForEdit = {};

  if (params.id) {
    transactionForEdit = transactions.find((item) => item.id === params.id);
  }

  const [inputValues, setInputValues] = useState(
    params.id && transactionForEdit
      ? {
          amount: transactionForEdit.amount,
          type: transactionForEdit.type,
          category: transactionForEdit.category,
          date: transactionForEdit.date,
          description: transactionForEdit.description,
        }
      : {
          amount: "",
          type: "",
          category: "",
          date: "",
          description: "",
        },
  );

  const categoryList = useMemo(() => {
    const list = Array.isArray(categories) ? categories : [];
    if (!inputValues.type) return list;
    return list.filter((item) => item.type === inputValues.type);
  }, [categories, inputValues.type]);

  useEffect(() => {
    if (!showSuccessModal || successModalPhase !== "loading") return;
    const t = setTimeout(() => setSuccessModalPhase("done"), 900);
    return () => clearTimeout(t);
  }, [showSuccessModal, successModalPhase]);

  const handleInputChange = (e) => {
    let inputNam = e.target.name;
    let inputVal = e.target.value;

    if (inputNam === "amount")
      inputVal = inputVal === "" ? "" : Number(inputVal);

    setInputValues((prev) => ({ ...prev, [inputNam]: inputVal }));

    setError("");
  };

  const resetFields = () => {
    setInputValues({
      amount: "",
      type: "",
      category: "",
      date: "",
      description: "",
    });
  };

  const saveDetails = () => {
    const isFormInputEmpty = Object.values(inputValues).some(
      (item) => !item || (typeof item === "string" && item.trim() === ""),
    );
    if (isFormInputEmpty) {
      setError("Please fill all the fields");
    } else {
      setError("");

      if (params.id) {
        dispatch(editTransaction({ id: params.id, ...inputValues }));
        resetFields();
        setSuccessModalPhase("loading");
        setShowSuccessModal(true);
      } else {
        dispatch(addTransaction(inputValues));
        resetFields();
        setSuccessModalPhase("loading");
        setShowSuccessModal(true);
      }
    }
  };

  const closeSuccessGoToList = () => {
    setShowSuccessModal(false);
    setSuccessModalPhase("idle");
    navigate("/transactions/list");
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
        heading="Record new entry"
        subHeading="Transaction"
        image="/transfer.png"
      >
        <p className="mt-1 text-sm text-slate-600">
          Add a new income or expense to keep your records updated. Maintain
          accurate and organized financial data.
        </p>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border bg-gradient-to-bl from-pink-50 to-pink-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600">Salary</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            &#8377;{salary ? salary : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-bl from-pink-50 to-pink-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600">Balance</div>
          <div className="mt-2 text-2xl font-semibold text-emerald-600">
            &#8377;{balance ? balance : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-gradient-to-bl from-pink-50 to-pink-200 p-4 shadow-sm">
          <div className="text-sm text-slate-600">Expense</div>
          <div className="mt-2 text-2xl font-semibold text-rose-600">
            &#8377;{expense ? expense : 0}
          </div>
        </div>
      </div>
      <div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4">
            <div className="text-lg font-semibold text-slate-900">
              {params.id ? "Edit" : "Add New"} transaction
            </div>
            <div className="mt-1 text-xs text-slate-500">some text</div>
          </div>

          <form
            className="space-y-4 p-4 w-full md:w-3/4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="amount"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  value={inputValues.amount}
                  onChange={handleInputChange}
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  max={todayDate}
                  value={inputValues.date}
                  onChange={handleInputChange}
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm
                   focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
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

              <div>
                <label
                  htmlFor="category"
                  className="text-xs font-semibold text-slate-700 block"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={inputValues.category}
                  onChange={handleInputChange}
                  className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
                >
                  <option value="">Select Category</option>
                  {categoryList &&
                    categoryList.length > 0 &&
                    categoryList.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.icon}&nbsp; {category.name}
                      </option>
                    ))}
                </select>
                <p className="text-xs my-1">
                  Category not found?
                  <Link to="/categories" className="font-medium text-pink-700">
                    <span>+</span>
                    <span>Add</span>
                  </Link>
                  ”
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="text-xs font-semibold text-slate-700 block"
              >
                Description
              </label>
              <input
                id="description"
                name="description"
                value={inputValues.description}
                onChange={handleInputChange}
                placeholder="Enter transaction detail.."
                maxLength="200"
                className="mt-2 h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm
                 focus:border-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100"
                required
              />
            </div>
            {error && (
              <p
                className="text-rose-500 text-xs font-bold"
                role="alert"
                aria-live="polite"
              >
                {" "}
                {error}
              </p>
            )}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={saveDetails}
                className={`inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-medium text-white shadow-sm ${
                  error
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-pink-700   hover:bg-pink-600 cursor-pointer"
                }`}
              >
                Save
              </button>
              <button
                type="button"
                onClick={resetFields}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <GlobalModal
          ariaLabel={
            successModalPhase === "loading"
              ? "Saving transaction"
              : "Transaction saved"
          }
          ariaBusy={successModalPhase === "loading"}
          onClose={dismissSuccessModal}
        >
          {successModalPhase === "loading" ? (
            <div className="flex flex-col items-center justify-center py-4">
              <img
                src="/transfer.png"
                alt=""
                className="mx-auto h-20 w-auto animate-pulse drop-shadow-sm"
              />
              <div
                className="mt-5 h-9 w-9 rounded-full border-2 border-pink-100 border-t-pink-700 animate-spin"
                aria-hidden="true"
              />
              <p className="mt-5 text-sm font-medium text-slate-700">
                Saving your transaction…
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
                {isEditMode
                  ? "Your transaction was updated successfully."
                  : "Your transaction was added successfully."}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  type="button"
                  onClick={closeSuccessGoToList}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-pink-700 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-pink-600"
                >
                  View all transactions
                </button>
                <button
                  type="button"
                  onClick={closeSuccessStay}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  {isEditMode ? "Continue here" : "Add another entry"}
                </button>
              </div>
            </>
          )}
        </GlobalModal>
      )}
    </section>
  );
}
export default AddTransaction;
