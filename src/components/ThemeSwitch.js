const ThemeSwitch = ({ switchTheme }) => {
  return (
    <div className="toggle-switch">
      <label>
        <input type="checkbox" onChange={switchTheme} />
        <span className="slider"></span>
      </label>
    </div>
  );
};
export default ThemeSwitch;
