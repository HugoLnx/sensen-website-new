import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, width = "100%" }: RevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Começa invisível e 50px abaixo
      whileInView={{ opacity: 1, y: 0 }} // Quando entra na tela, fica visível e sobe
      exit={{ opacity: 0, y: 50 }} //  Desaparece ao sair
      viewport={{ once: false, margin: "-100px" }} // Anima apenas uma vez quando estiver 100px dentro da tela
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};