import { motion } from "framer-motion";
export default function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }} // starts offscreen to the right
      animate={{ x: 0, opacity: 1 }} // slides into view
      exit={{ x: "-100%", opacity: 0 }} // slides out to the left
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-full h-full bg-white"
    >
      {children}
    </motion.div>
  );
}
