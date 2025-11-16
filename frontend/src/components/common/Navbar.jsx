import "../../index.css";
import PropTypes from "prop-types";

function Navbar({ accentColor }) {
  let color = '';

  if (accentColor == "orange") {
    color = "text-[var(--darker-primary)]";
  } else if (accentColor == "light-yellow") {
    color = "text-[var(--darker-secondary)]";
  } else if (accentColor == "purple") {
    color = "text-[var(--darker-accent-2)]";
  } else {
    color = "text-[var(--black)]";
  }

  return (
    <nav className="w-screen text-center py-3">
      <h4 className="text-[var(--neutral)]">
        <span className={`${color}`}>Grade</span>Up
      </h4>
    </nav>
  );
}

Navbar.propTypes = {
  accentColor: PropTypes.string,
};

export default Navbar;
