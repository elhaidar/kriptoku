// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col max-w-lg min-h-screen bg-gray-900 w-screen items-center">
      {children}
    </div>
  );
};

export default Layout;
