// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 dark:text-white dark:bg-gray-900">
      <div className="flex flex-col max-w-lg min-h-screen dark:bg-gray-900 w-screen items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
