import React from 'react';
import Select from 'react-select';
import './Navbar.css';

const Navbar = ({ language, setLanguage, theme, setTheme }) => {
  const languages = [
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ];

  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];

  return (
    <div className="navbar">
      <h4>Magic AI Guided Code Compiler</h4>
      <div>
      <Select
        options={languages}
        value={{ value: language, label: language }}
        onChange={(selectedOption) => setLanguage(selectedOption.value)}
        placeholder={language}
        className='select-class'
      />
      </div>
      <div>
      <Select
        options={themes}
        value={{ value: theme, label: theme === "vs-dark" ? "Dark" : "Light" }}
        onChange={(selectedOption) => setTheme(selectedOption.value)}
        placeholder={theme === "vs-dark" ? "Dark" : "Light"}
        className='select-class'
      />
      </div>
    </div>
  );
};

export default Navbar;
