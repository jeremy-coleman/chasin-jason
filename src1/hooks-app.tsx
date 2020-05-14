require("./prefresh");
import React, { useState } from "preact/compat";

export const HookStateApp = (props) => {
  const [state, setState] = useState({ count: 0 });

  const increment = () => {
    const current = state.count;
    const next = current + 1;
    setState({ count: next });
  };

  const decrement = () => {
    const current = state.count;
    const next = current - 1;
    setState({ count: next });
  };

  return (
    <div>
      <p>Yuiko's madness level: {state.count}</p>
      <button onClick={increment}>Increments</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
