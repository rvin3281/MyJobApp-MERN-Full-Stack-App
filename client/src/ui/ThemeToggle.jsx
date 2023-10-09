import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkTheme } from '../slices/dasboardSlice';
import { useEffect } from 'react';

const ThemeToggle = () => {
  const isDarkTheme = useSelector((state) => state.dashboard.isDarkTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme);
  }, [isDarkTheme]);

  // Store in local storate
  // localStorage.setItem('darkTheme', isDarkTheme);

  const handleTheme = () => {
    dispatch(toggleDarkTheme());
    // The state will change on render -> We pre-toggle
    localStorage.setItem('darkTheme', !isDarkTheme);
  };

  return (
    <Wrapper onClick={handleTheme}>
      {isDarkTheme ? (
        <BsFillSunFill className="toggle-icon" />
      ) : (
        <BsFillMoonFill />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
