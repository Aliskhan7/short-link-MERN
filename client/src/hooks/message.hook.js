import { useCallback } from "react";
import Alert from "../components/Alert";

export const useMessage = () => {
  return useCallback((text) => {
    if (text) {
      console.log("texthh", text);
      return <Alert text={text} />;
    }
  }, []);
};
