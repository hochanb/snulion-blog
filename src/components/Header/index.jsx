import lion from "../../assets/images/lion.jpg";
import "./Header.css";
const Header = () => {
  return (
    <div id="header-wrapper" className="flex justify-between">
      <div className="flex items-center">
        <img id="header-lion" src={lion} alt="lion" />
      </div>
    </div>
  );
};

export default Header;