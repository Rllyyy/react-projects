import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  //Alternative if this is using problems
  let { pathname } = useLocation();

  useEffect(() => {
    const scroll = () => {
      window.scrollTo(0, 0);
    };
    return () => {
      scroll();
    };
  }, [pathname]);

  return null;
}
