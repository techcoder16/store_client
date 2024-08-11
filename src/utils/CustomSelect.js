import React from 'react';
import Select from 'react-select';

// Custom styles for react-select
const customStyles = {
  container: (provided) => ({
    ...provided,
    marginTop: '0.5rem', // Custom margin
    width: '100%', // Full width
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? 'white' : '#ffffff', // Background color
    borderColor: state.isFocused ? '#20253F' : '#20253F', // Border color
    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(32, 37, 63, 0.25)' : 'none', // Shadow when focused
    '&:hover': {
      borderColor: '#20253F', // Border color on hover
    },
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999, // Ensure the menu is on top
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px', // Max height of the dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#20253F' : state.isFocused ? '#20253F' : '#ffffff', // Background color of options
    color: state.isSelected || state.isFocused ? 'white' : '#20253F', // Text color of options
    '&:active': {
      backgroundColor: '#20253F', // Background color when active
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#20253F', // Color of the placeholder
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#20253F', // Color of the selected value
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
  />
);


export default CustomSelect;
