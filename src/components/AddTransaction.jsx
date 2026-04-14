import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  editTransaction,
} from "../features/transaction/transactionSlice";
import useFetchExpenses from "../hooks/useFetchExpenses";
import { useNavigate, useParams, Link } from "react-router-dom";
import PageHeader from "./PageHeader";

function AddTransaction() {
  const categories = useSelector((state) => state.category.list);
  const transactions = useSelector((state) => state.transaction.list);

  const [categoryList, setCategoryList] = useState(categories);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [salary, expense, balance] = useFetchExpenses();
  const params = useParams();
  const todayDate = new Date().toISOString().split("T")[0];
  let transactionForEdit = {};

  if (params.id) {
    transactionForEdit = transactions.find((item) => item.id === params.id);
  }

  const [inputValues, setInputValues] = useState(
    params.id
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
        }
  );

  useEffect(() => {
    const list = categories.filter(
      (item) => item.type === transactionForEdit.type
    );
    setCategoryList(list);
  }, []);

  const handleInputChange = (e) => {
    let inputNam = e.target.name;
    let inputVal = e.target.value;

    if (inputNam === "type") {
      let list = categories.filter((item) => item.type === inputVal);
      setCategoryList(list);
    }
    if (inputNam === "amount")
      inputVal = inputVal === "" ? "" : Number(inputVal);

    setInputValues((prev) => ({ ...prev, [inputNam]: inputVal }));

    if (inputVal !== "") {
      setError("");
    } else {
      setError("Please fill all fields");
    }
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
      (item) => !item || (typeof item === "string" && item.trim() === "")
    );
    if (isFormInputEmpty) {
      setError("Please fill all the fields");
    } else {
      setError("");

      if (params.id) {
        dispatch(editTransaction({ id: params.id, ...inputValues }));
      } else {
        dispatch(addTransaction(inputValues));
      }

      navigate("/transactions/list");
    }
  };

  return (
    <section className="space-y-6">
      <PageHeader
        heading="Record new entry"
        subHeading="Transaction"
        image="transfer.png"
      >
        <p className="mt-1 text-sm text-slate-600">
          Add a new income or expense to keep your records updated.
          <br />
          Maintain accurate and organized financial data.
        </p>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-600">Salary</div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            &#8377;{salary ? salary : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm text-slate-600">Balance</div>
          <div className="mt-2 text-2xl font-semibold text-emerald-600">
            &#8377;{balance ? balance : 0}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
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
            className="space-y-4 p-4 w-3/4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-3">
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

            <div className="grid grid-cols-2 gap-3">
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
              <p className="text-rose-500 text-xs font-bold"> {error}</p>
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
    </section>
  );
}
export default AddTransaction;
