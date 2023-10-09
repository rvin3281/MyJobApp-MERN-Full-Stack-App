import Wrapper from '../../assets/wrappers/LandingPage';
import { Logo } from '../../ui/index';
import main from '../../assets/images/main.svg';
import { Link } from 'react-router-dom';

const LandingFront = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            My <span>Job</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            enim dignissimos ab quam et quae illum asperiores nesciunt
            voluptatum quidem.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="my job application" className="img main-img" />
      </div>
    </Wrapper>
  );
};
export default LandingFront;
