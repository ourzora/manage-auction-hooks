import { useContext } from "react";
import { AsksHooksContext } from "../../context/AsksHooksContext";

export const useAsksHooksContext = () =>
  useContext(AsksHooksContext);
