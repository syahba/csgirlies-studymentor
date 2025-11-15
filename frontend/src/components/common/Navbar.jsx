import '../../index.css';

function Navbar({ accentColor }) {
  let color;
  if (accentColor == 'yellow') {
    color = 'var(--darker-secondary)';
  } else if (accentColor == 'orange') {
    color = 'var(--darker-primary)';
  } else if (accentColor == 'blue') {
    color = 'var(--darker-accent-2)';
  } else {
    color = 'var(--black)';
  }

  return (
    <nav className='w-screen text-center py-3'>
      <h4 className='text-[var(--neutral)]'><span className={`text-[${color}]`}>Grade</span>Up</h4>
    </nav>
  );
}

export default Navbar;