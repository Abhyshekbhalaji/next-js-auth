"use client";
import React from 'react';

const CustomInput = ({ label, value, onChange, placeholder,type }) => {
  return (
    <div className='flex flex-col p-1' >
      {label && <label className="mb-2 text-center "htmlFor={label}>{label}</label>}
      <input
        className="p-2 rounded-lg border text-black border-gray-400 mb-4 ml-4"
        id={label}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomInput;