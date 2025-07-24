import { useSelector } from "react-redux";

const Footer = () => {
  const { theme } = useSelector((state) => state.themeSliceApp);

  return (
    <>
      <footer
        className={`border-t md:gap-2 py-6 text-xs md:text-base  flex md:flex-row flex-col justify-center items-center ${
          theme === "dark" ? " border-gray-700" : " border-gray-100  "
        }`}
      >
        <p className="text-center">
          Crafted with passion by the{" "}
          <span className="text-orange-500 font-semibold">Blogify Team</span>{" "}
          &copy; 2024 Blogify. All rights reserved.
        </p>
      </footer>
    </>
  );
};
export default Footer;
