import { motion } from "framer-motion";

const ShinyText = ({ children }) => {
  return (
    <motion.h1
      initial={{ backgroundPosition: "200%" }}
      animate={{ backgroundPosition: "0%" }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      className="text-4xl font-bold text-transparent font-birthday whitespace-nowrap text-nowrap bg-clip-text bg-gradient-to-r from-white via-gray-500 to-secondary bg-[length:200%_auto]"
    >
      {children}
    </motion.h1>
  );
};

export default ShinyText;
