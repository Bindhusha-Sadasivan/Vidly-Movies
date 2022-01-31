import React from "react";
import "./App.css";
// import Movies from "./components/moviesVersionOne";
import Movies from "./components/movies";

class App extends React.Component {
  render() {
    return (
      <div>
        <main className="container">
          {/* <h1>Hello World</h1> */}
          <Movies />
        </main>
      </div>
    );
  }
}

export default App;
