import OmikujiBox from "./component/OmikujiBox";
import DrawControl from "./component/DrawControl";
import { useState } from "react";

function App() {
  return (
    <div className="app">
      <div className="stage" role="main" aria-label="百鬼御籤舞台">
        {/* <h1 className="title">百鬼御籤</h1> */}
        <OmikujiBox />
      </div>

      <DrawControl />
    </div>
  );
}

export default App;
