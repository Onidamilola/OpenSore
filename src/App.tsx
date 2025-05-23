import React from "react";
import AppRoutes from "./routes/Approutes";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <AppRoutes />
    </div>
  );
};

export default App;
