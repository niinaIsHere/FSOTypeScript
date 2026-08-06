type headerProps = {
  courseName: string;
};

const Header = ({ courseName }: headerProps) => {
  return (
    <div>
      <h1>{courseName}</h1>
    </div>
  );
};

export default Header;
