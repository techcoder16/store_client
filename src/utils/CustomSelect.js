import React from 'react';
import Select from 'react-select';

// Custom styles for react-select
const customStyles = {
  container: (provided) => ({
    ...provided,
    marginTop: '0.5rem',
    width: '100%',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : '#ffffff',
    borderColor: state.isFocused ? '#20253F' : '#20253F',
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(32, 37, 63, 0.25)' : 'none',
    '&:hover': {
      borderColor: '#20253F',
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#20253F' : state.isFocused ? '#20253F' : '#ffffff',
    color: state.isSelected || state.isFocused ? 'white' : '#20253F',
    padding: '10px 15px', // Adjust padding to ensure consistent height
    fontSize: '14px', // Adjust font size if needed
    lineHeight: '20px', // Ensure consistent line height
    '&:active': {
      backgroundColor: '#20253F',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#20253F',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#20253F',
  }),
};

const CustomSelect = ({ options, onChange, placeholder,onInputChange }) => (
  <Select

    options={options}
    onChange={(selectedOption) => onChange(selectedOption?.label || null)}
    placeholder={placeholder}
    onInputChange={(searchedOption) => onInputChange(searchedOption || null)}
    className="mt-2 block w-full"
    classNamePrefix="custom-select"
    styles={customStyles} // Apply custom styles
    displayEmpty
    defaultValue={"Select All"}
    
    isClearable={false}
    renderValue={
      (value) => {
        return value || 'None'
      }
    }
  />
);


export default CustomSelect;
