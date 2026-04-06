import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addTransaction,
  editTransaction,
} from "../features/transaction/transactionSlice";
import useFetchExpenses from "../hooks/useFetchExpenses";
import { useNavigate, useParams } from "react-router-dom";

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
    let inputVal = e.target.value.trim();

    if (inputNam === "type") {
      let list = categories.filter((item) => item.type === inputVal);
      console.log(list);
      setCategoryList(list);
    }

    if (inputNam === "amount") inputVal = Number(inputVal);
    if (inputVal === "") {
      setError("Please fill all fields");
    } else {
      setInputValues((prev) => ({ ...prev, [inputNam]: inputVal }));
      setError("");
    }
  };

  const resetFields = () => {
    setInputValues({
      amount: 0,
      type: "",
      category: "",
      date: "",
      description: "",
    });
  };

  const saveTransaction = () => {};

  return (
    <section className="space-y-6">
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
                        {category.name}
                      </option>
                    ))}
                </select>
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

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={
                  params.id
                    ? () => {
                        dispatch(
                          editTransaction({ id: params.id, ...inputValues })
                        );
                        navigate("/transactions/list");
                      }
                    : () => {
                        dispatch(addTransaction(inputValues));
                        navigate("/transactions/list");
                      }
                }
                className="inline-flex h-10 items-center justify-center rounded-xl bg-pink-700 px-4 text-sm font-medium text-white shadow-sm hover:bg-pink-600"
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
