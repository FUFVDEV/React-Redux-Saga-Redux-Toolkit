import Header from "components/common/Header";
import Sidebar from "components/common/Sidebar";
import LoggedInRoutes from "routes/LoggedInRoutes";

import "antd/dist/antd.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="container">
        <Header />
        <div className="content">
          <LoggedInRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
