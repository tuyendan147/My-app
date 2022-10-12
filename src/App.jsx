import React from "react";
import "./App.css";
import TableList from "./pages/TableList";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container">
            <TableList />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
