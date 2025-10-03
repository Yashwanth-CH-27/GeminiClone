import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../utils/dataSlice";

export const useCountrycode = () => {
  const dispatch = useDispatch()
  const countryData = useSelector(store => store.APIdata.countryCodeData)
  const getCountrycodeData = async () => {
    try {
      const data = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,idd"
      );
      const jsonData = await data.json();
    //   console.log(jsonData);
      const countriesObj = jsonData.map((country) => ({
        name: country?.name?.common,
        code: country?.cca2,
        dialCode: country.idd.root
          ? `${country.idd.root}${
              country.idd.suffixes ? country.idd.suffixes[0] : ""
            }`
          : "",
      }));
    //   console.log(countriesObj);
    dispatch(addData(countriesObj))
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if(!countryData) getCountrycodeData();
  }, [countryData]);
//   return countryData;
};
