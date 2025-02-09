// dashboard/app/dashboard/page.tsx
import { motion } from 'framer-motion';

const DashboardPage = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Welcome to the Dashboard
      </motion.h1>
    </div>
  );
};

export default DashboardPage;