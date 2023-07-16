import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { defaultHex } from "../pages/studio";

export const useCanvasHistory = (setHex: Dispatch<SetStateAction<string>>) => {
  const [history, setHistory] = useState<string[]>([defaultHex]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  /* 
    This function is meant to be run when a new block is added to the canvas
    It either adds the new hex to the history it overrides the history if you 
    modified the canvas but were not at the most recent point
  */
  function syncHistoryOnCanvasUpdate(newHex: string) {
    if (historyIndex !== history.length - 1 && history.length > 1) {
      setHistory((prev) => {
        return prev.slice(0, historyIndex + 1);
      });
    }
    setHistory((prev) => {
      return [...prev, newHex];
    });
    setHistoryIndex((prev) => prev + 1);
  }

  /* 
    handleUndo() and handleRedo() are defined within the component, thus they are being re-created on every render, 
    this causes the useEffect to rerun excessively. We can solve this by using the useCallback Hook, which will return 
    a memoized version of the callback that only changes if one of the dependencies has changed:
  */
  const handleUndo = useCallback(() => {
    if (historyIndex - 1 >= 0) {
      setHex(history[historyIndex - 1]);
      setHistoryIndex((prev) => prev - 1);
    }
    console.log("handleUndo():: Ran");
  }, [historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (historyIndex + 1 <= history.length - 1) {
      setHex(history[historyIndex + 1]);
      setHistoryIndex((prev) => prev + 1);
    }
    console.log("handleRedo():: Ran");
  }, [historyIndex, history]);

  function handleResetHistory() {
    setHistory([defaultHex]);
    setHistoryIndex(0);
  }

  /* Add event listeners for undo and redo commands */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      /* 
          Check for redo command 
          cmd + shift + z
          This if statement must come first to check if the shift key is being pressed
        */
      if (
        (event.ctrlKey || event.metaKey) && // cmd or ctrl key
        event.shiftKey &&
        event.key === "z"
      ) {
        handleRedo();
        return;
      }

      /* 
          Check for undo command 
          cmd + z
        */
      if (
        (event.ctrlKey || event.metaKey) && // cmd or ctrl key
        event.key === "z"
      ) {
        handleUndo();
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRedo, handleUndo]);

  return {
    syncHistoryOnCanvasUpdate,
    handleRedo,
    handleUndo,
    handleResetHistory,
  };
};
