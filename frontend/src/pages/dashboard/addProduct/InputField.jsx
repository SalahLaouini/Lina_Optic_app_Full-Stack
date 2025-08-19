import React from 'react';

const InputField = ({ label, name, type = 'text', register, placeholder }) => {
  // 📦 Props:
  // - label: 🏷️ Text label shown above the input field
  // - name: 🔑 Field name used for registration in react-hook-form
  // - type: 🔢 Input type (text, email, number, etc.), defaults to 'text'
  // - register: 📝 react-hook-form's register function to link form inputs
  // - placeholder: 🧾 Placeholder text inside the input

  // ✅ This component renders a single input field with a label
  // 🎯 It connects the input to react-hook-form using the `register` prop
  // 🎨 Includes basic styling for a clean UI

  return (
    <div className="mb-4">
      {/* 🏷️ Label for the input */}
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      {/* 🔤 Input field */}
      <input
        type={type}
        {...register(name, { required: true })} // ✅ Required field validation
        className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
