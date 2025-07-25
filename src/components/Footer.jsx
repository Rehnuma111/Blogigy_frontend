import { useSelector } from "react-redux";

const Footer = () => {
  const { theme } = useSelector((state) => state.themeSliceApp);

  return (
    <footer
      className={`border-t md:gap-2 py-6 text-xs md:text-base w-full mt-auto flex md:flex-row flex-col justify-center items-center ${
        theme === "dark" ? "border-gray-700 bg-gray-900 text-gray-300" : "border-gray-100 bg-white text-gray-700"
      }`}
      style={{ position: 'relative', bottom: 0, left: 0 }}
    >
      <p className="text-center">
        Crafted with passion by the{' '}
        <span className="text-orange-500 font-semibold">Blogify Team</span>{' '}
        &copy; 2024 Blogify. All rights reserved.
      </p>
    </footer>
  );
};
export default Footer;
