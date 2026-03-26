import { motion } from "framer-motion";

function Mascota(props) {
  return (
    <motion.div
      initial={{ x: 200, opacity: 0, rotate: 90 }} // Comienza desde la derecha con x: 200
      animate={{ x: 30, opacity: 1, rotate: 0 }} // Se mueve hacia el centro
      transition={{ duration: 2 }}
      className="w-60 h-60 flex items-center justify-center"
    >
      {props.children}
    </motion.div>
  );
}

export default Mascota;
