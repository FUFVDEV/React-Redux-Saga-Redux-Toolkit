import { Navigate, Routes, Route } from "react-router-dom";

import User from "views/User";

const LoggedInRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="usuarios" />} />
      <Route path="usuarios" element={<User />} />
    </Routes>
  );
};

export default LoggedInRoutes;
