"use client";
import React, { useState, ChangeEvent } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  options: Option[];
  onSelect: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };
  return (
    <select
      className="select select-info select-sm"
      value={selectedOption}
      onChange={handleSelectChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
