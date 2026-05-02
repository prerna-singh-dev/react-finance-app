import { useSelector } from "react-redux";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setfilters, resetFilters } from "../features/filters/filterSlice";

function Filters({ applyFilters, onResetFilters, closeFilters }) {
  const categoryList = useSelector((state) => state.category.list);
  const filters = useSelector((state) => state.filters.options);

  const [selectedType, setSelectedType] = useState(filters.type);
  const [minAmount, setMinAmount] = useState(filters.minAmount);
  const [maxAmount, setMaxAmount] = useState(filters.maxAmount);
  const [category, setCategory] = useState(filters.category);
  const [date, setDate] = useState(filters.date);

  const dispatch = useDispatch();

  const handleCheckbox = (event) => {
    const selectedValue = event.target.value;
    const isChecked = event.target.checked;

    setCategory((prev) => {
      if (isChecked) {
        return [...prev, selectedValue];
      } else return prev.filter((item) => item !== selectedValue);
    });
  };

  const handleFilters = () => {
    const payload = {
      minAmount,
      maxAmount,
      type: selectedType,
      category,
      date,
    };
    dispatch(setfilters(payload));
    // Parent must not rely on Redux yet in this tick — pass criteria explicitly.
    applyFilters(payload);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setSelectedType("");
    setMinAmount("");
    setMaxAmount("");
    setCategory([]);
    setDate("");
    onResetFilters();
  };

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white";
  return (
    <div className="mb-6 p-4 bg-gradient-to-bl from-pink-50 to-pink-200 mx-4">
      <div className="flex justify-between items-center py-2 mb-3 border-b-2 border-white">
        <h3 className="font-medium  flex-1">Filters</h3>
        <button
          type="button"
          onClick={closeFilters}
          className={`text-2xl ${focusRing}`}
          aria-label="Close filters"
        >
          &times;
        </button>
      </div>

      <div className="text-sm my-6">
        <div className="flex items-start lg:items-center flex-col lg:flex-row gap-4 mb-6">
          <h4 className="font-medium lg:min-w-16">Type</h4>
          <ul className="flex items-center gap-4">
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="type"
                  className="peer absolute opacity-0"
                  value={selectedType}
                  checked={selectedType === "Income"}
                  onChange={() => setSelectedType("Income")}
                />
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
                >
                  Income
                </span>
              </label>
            </li>
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="type"
                  className="peer absolute opacity-0"
                  value={selectedType}
                  checked={selectedType === "Expense"}
                  onChange={() => setSelectedType("Expense")}
                />
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
                >
                  Expense
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div className="flex items-start lg:items-center flex-col lg:flex-row gap-4 mb-6">
          <h4 className="font-medium lg:min-w-16">Amount</h4>
          <ul className="flex  items-start lg:items-center gap-4">
            <li>
              <input
                type="number"
                min="0"
                placeholder="From"
                className={`p-1 rounded-md text-xs ${focusRing}`}
                value={minAmount}
                onChange={(e) => setMinAmount(Number(e.target.value))}
              />
            </li>
            <li>-</li>
            <li>
              <input
                type="number"
                min="0"
                placeholder="To"
                className={`p-1 rounded-md text-xs ${focusRing}`}
                value={maxAmount}
                onChange={(e) => setMaxAmount(Number(e.target.value))}
              />
            </li>
          </ul>
        </div>
        <div className="flex items-start lg:items-center flex-col lg:flex-row gap-4 mb-6">
          <h4 className="font-medium lg:min-w-16">Month</h4>
          <ul className="flex items-center gap-4">
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="Date"
                  className="peer absolute opacity-0"
                  value={date}
                  checked={date === "All"}
                  onChange={() => setDate("All")}
                />
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium  bg-white cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
                >
                  All
                </span>
              </label>
            </li>
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="date"
                  className="peer absolute opacity-0"
                  value={date}
                  checked={date === "Last 7 Days"}
                  onChange={() => setDate("Last 7 Days")}
                />
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium  bg-white cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
                >
                  Last 7 Days
                </span>
              </label>
            </li>
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="date"
                  className="peer absolute opacity-0"
                  value={date}
                  checked={date === "Last Month"}
                  onChange={() => setDate("Last Month")}
                />
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium bg-white cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
                >
                  Last Month
                </span>
              </label>
            </li>
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="date"
                  className="peer absolute opacity-0"
                  value={date}
                  checked={date === "This Month"}
                  onChange={() => setDate("This Month")}
                />
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-medium bg-white cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
                >
                  This Month
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div className="flex items-start lg:items-center flex-col lg:flex-row gap-4 mb-6">
          <h4 className="font-medium lg:min-w-16">Category</h4>
          <ul className="flex items-center gap-3 flex-wrap">
            {categoryList &&
              categoryList?.length &&
              categoryList.map((item) => (
                <li className="" key={item.id}>
                  <label className="customField relative">
                    <input
                      type="checkbox"
                      name="category"
                      value={item.name}
                      className="peer absolute opacity-0"
                      onChange={(e) => handleCheckbox(e)}
                      checked={category.includes(item.name)}
                    />
                    <span className="rounded-full px-3 py-1 text-xs font-medium cursor-pointer bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-pink-700 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white">
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end items-center">
        <button
          type="button"
          className={`mx-1 bg-pink-700 text-white px-4 py-2 text-sm rounded-lg ${focusRing}`}
          onClick={handleFilters}
        >
          Apply
        </button>
        <button
          type="button"
          className={`mx-1 bg-white px-4 py-2 text-sm rounded-lg ${focusRing}`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
