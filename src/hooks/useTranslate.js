
import { useSelector } from "react-redux";

export function useTranslate() {
  const language = useSelector((state) => state.translate.value);
  return language;
}
