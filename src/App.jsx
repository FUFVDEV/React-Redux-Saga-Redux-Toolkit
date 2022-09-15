import Header from "components/common/Header";
import LoggedInRoutes from "routes/LoggedInRoutes";
import Sidebar from "components/common/Sidebar";

import "./App.css";
import "antd/dist/antd.min.css";

function App() {
  console.log("App");
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
