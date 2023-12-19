import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import request from "../../../utils/request";
import { TERipple } from "tw-elements-react";

const SearchBar = () => {
  const [suggestions, setSuggestions] = useState(["Sale", "Giảm giá sốc"]);
  const [value, setValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get(`/getData/search`);
        const data = res.data;
        if (data) {
          setSuggestions([...data]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchApi();
  }, []);
  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return suggestions.filter((language) =>
      language.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: "Input search",
    value,
    onChange: onChange,
  };

  return (
    <div className="md:w-96 mx-auto ">
      <div className="relative flex w-full flex-wrap items-stretch">
        <Autosuggest
          id="search"
          suggestions={suggestionsList}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <button
          class="bg-gray-500 hover:bg-blue-500 text-white py-2 px-2 my-2 rounded"
          onClick={(e) => {
            e.preventDefault();
            console.log(value); // Xử lí value ở đây nhé
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
