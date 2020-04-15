import { useState } from "react";

export default function useVisualMode(intial) {
  const [mode, setMode] = useState(intial);
  const [history, setHistory] = useState([intial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode);
    }
    if (!replace) {
      setHistory(prev => [...prev, newMode]);
      setMode(newMode);
    }
  };
  const back = () => {
    if (history.length > 1) {
      history.pop();
      const prevMode = history[history.length - 1];
      setMode(prevMode);
    }
  };

  return { mode, transition, back };
}
