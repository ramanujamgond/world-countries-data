import React, { useState, useEffect } from "react";

const CountryCard = ({
  data
}) => {
  const { name, flags, capital, languages, population, currencies } = data;

  return (
    <>
      <div className="card">
        <div className="country-flag">
          <img src={flags.svg} alt="" />
        </div>
        <div className="country-details">
          <div className="country-name">
            {name.length > 10
              ? `${name.toUpperCase().slice(1, 10)}...`
              : name.toUpperCase()}
          </div>
          <div className="country-other-details">
            <div>
              <span>Capital: </span>
              {capital}
            </div>
            <div>
              <span>Language: </span>
              {languages[0].name}
            </div>
            <div>
              <span>Population: </span>
              {population}
            </div>
            <div>
              <span>Currency: </span>
              {currencies?.[0]?.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Country = () => {
  const [countryData, setCountryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getCountryData();
  }, []);

  const getCountryData = async () => {
    const countryDataUrl = "https://restcountries.com/v2/all";
    try {
      const response = await fetch(countryDataUrl);
      const resData = await response.json();
      setCountryData(resData);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(countryData);


  const HandleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== '') {
      const filteredData = countryData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchQuery.toLowerCase());
      })
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(countryData)
    }
  }


  return (
    <>
      <div className="header-section">
        <div className="number-of-countries">
          Currently, we have {countryData.length} countries
        </div>
      </div>

      <div className="search-feild">
        <input type="text" value={searchQuery} name="searchFeild" onChange={HandleSearch} placeholder="Search countries by name, city and languages" />
      </div>

      <div className="country-card">
        {/* {searchInput.length > 1 ? ():()} */}
        {countryData &&
          countryData.map((countryDetails, index) => {
            return (
              <CountryCard
                key={index}
                data={countryDetails}
              />
            );
          })}
      </div>
    </>
  );
};

export default Country;
