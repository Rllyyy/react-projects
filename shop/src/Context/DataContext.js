import { createContext, useMemo, useState } from "react";
import { data } from "../data";

export const DataContext = createContext([]);

//Provide the data to all children
export const DataProvider = (props) => {
  const [initialData, setInitialData] = useState(data);
  //Memo might be complete useless because the data will never change
  const providerValue = useMemo(() => ({ initialData, setInitialData }), [initialData, setInitialData]);

  return <DataContext.Provider value={providerValue.initialData}>{props.children}</DataContext.Provider>;
};
