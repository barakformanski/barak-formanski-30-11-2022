const ThemeSwitch = ({ switchTheme, theme }) => {
  return (
    <div className="toggle-switch">
      <label>
        <input
          className="toggle-input"
          type="checkbox"
          onChange={switchTheme}
          checked={theme === "light" ? true : false}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};
export default ThemeSwitch;
