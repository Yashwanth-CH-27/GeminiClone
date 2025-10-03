import { useEffect } from "react";

export const useCountrycode = () => {
  const getCountrycodeData = async () => {
    try {
      const data = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,cca3");
      const jsonData = await data.json();
      console.log(jsonData);
    } catch (err) {
        console.log(err)
    }
  };
  useEffect(() => {
    getCountrycodeData();
  }, []);
};
