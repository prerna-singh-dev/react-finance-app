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
    dispatch(
      setfilters({
        minAmount,
        maxAmount,
        type: selectedType,
        category: category,
        month: "",
      })
    );
    applyFilters();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setSelectedType("");
    setMinAmount("");
    setMaxAmount("");
    setCategory([]);
    onResetFilters();
  };
  return (
    <div className="mb-6 p-4 bg-gradient-to-bl from-pink-50 to-pink-200 mx-4">
      <div className="flex justify-between items-center py-2 mb-3 border-b-2 border-white">
        <h3 className="font-medium  flex-1">Filters</h3>
        <button onClick={closeFilters} className="text-2xl">
          &times;
        </button>
      </div>

      <div className="text-sm my-6">
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-medium min-w-16">Type</h4>
          <ul className="flex items-center gap-4">
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="type"
                  className="absolute opacity-0"
                  value={selectedType}
                  checked={selectedType === "Income"}
                  onChange={() => setSelectedType("Income")}
                />
                <span className="rounded-full px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 cursor-pointer">
                  Income
                </span>
              </label>
            </li>
            <li>
              <label className="customField relative">
                <input
                  type="radio"
                  name="type"
                  className="absolute opacity-0"
                  value={selectedType}
                  checked={selectedType === "Expense"}
                  onChange={() => setSelectedType("Expense")}
                />
                <span className="rounded-full px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 cursor-pointer">
                  Expense
                </span>
              </label>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <h4 className="font-medium min-w-16">Amount</h4>
          <ul className="flex items-center gap-4">
            <li>
              <input
                type="number"
                min="0"
                placeholder="From"
                className="p-1 rounded-md text-xs"
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
                className="p-1 rounded-md text-xs"
                value={maxAmount}
                onChange={(e) => setMaxAmount(Number(e.target.value))}
              />
            </li>
          </ul>
        </div>
        <div className="flex items-start gap-4 mb-6">
          <h4 className="font-medium min-w-16">Category</h4>
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
                      className="absolute opacity-0"
                      onChange={(e) => handleCheckbox(e)}
                      checked={category.includes(item.name)}
                    />
                    <span className="rounded-full px-3 py-1 text-xs font-medium cursor-pointer bg-white">
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
          className="mx-1 bg-pink-700 text-white px-4 py-2 text-sm rounded-lg"
          onClick={handleFilters}
        >
          Apply
        </button>
        <button
          className="mx-1 bg-white px-4 py-2 text-sm rounded-lg"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filters;
