import React from 'react';

const SelectField = ({ label, name, options, register }) => {
  // 📦 Props:
  // - label: 🏷️ Text label displayed above the select dropdown
  // - name: 🔑 Field name for form registration (used by react-hook-form)
  // - options: 📋 Array of options in the format { value: string, label: string }
  // - register: 📝 react-hook-form's register function to bind the field

  // ✅ This is a reusable select/dropdown component
  // ✅ It integrates with react-hook-form and enforces a required selection

  return (
    <div className="mb-4">
      {/* 🔖 Select Label */}
      <label className="block text-sm font-semibold text-gray-700">{label}</label>

      {/* 🔽 Dropdown Select */}
      <select
        {...register(name, { required: true })}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      >
        {/* 🔁 Render each option from the options array */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
