import React, { useState, useEffect } from 'react';

const AutocompleteInput = (dataModel) => {
  const [inputValue, setInputValue] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const isEdit = dataModel.isEdit;
  const modEditEventName = dataModel.modEditEventName;

  useEffect(() => {
    if (isEdit) {
      setInputValue(modEditEventName);
    }
  }, [isEdit, modEditEventName]);

  useEffect(() => {
    if (inputValue?.length >= 3) {
      async function fetchSuggestions() {
        try {
          const suggestionsRaw = await fetch(`/api/user/EventsCards/0`, {
            method: 'get'
          });
          if (suggestionsRaw.status === 200) {
            const data = await suggestionsRaw.json();
            setSuggestions(data);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      }
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value.split('-')[0]);
    handleSuggestionRole(event.target.value.split('-'));
    handleSuggestionLocation(event.target.value.split('-'));
    handleSuggestionYear(event.target.value.split('-'));
    setShowSuggestions(true);
  };

  const handleSuggestionRole = (nameArray) => {
    const length = nameArray?.length;
    console.log(nameArray)
    const currentEvent = suggestions.find(x => x.eventName.includes(nameArray[0])&& x.eventRole?.includes(nameArray[length - 1]))
    if (currentEvent != undefined)
      document.getElementById("event-role").value = currentEvent.eventRole;
  };
  const handleSuggestionLocation = (nameArray) => {
    const length = nameArray?.length;
    console.log(nameArray)
    const currentEvent = suggestions.find(x => x.eventName.includes(nameArray[0])&&x.eventRole.includes(nameArray[length - 1]))
    if (currentEvent != undefined)
      document.getElementById("event-location").value = currentEvent.eventLocation;
  };

  const handleSuggestionYear = (nameArray) => {
    const length = nameArray?.length;
    console.log(nameArray)
    const currentEvent = suggestions.find(x => x.eventName.includes(nameArray[0])&&x.eventRole.includes(nameArray[length - 1]))
    if (currentEvent != undefined)
      document.getElementById("event-year").value = currentEvent.eventYear;
  };

  return (
    <div>
      {isEdit ? (
        <input type="text" id="event-name" defaultValue={modEditEventName} />
      ) : (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type event name..."
            id="event-name"
            list="suggestionsList"
            autoComplete="off"
            required
          />
          {showSuggestions && (
            <datalist id="suggestionsList">
              {suggestions.map((suggestion, index) => (
                <option
                  key={index}
                  value={`${suggestion.eventName}-${suggestion.eventRole}`}
                />
              ))}
            </datalist>
          )}
        </>
      )}
    </div>
  );
};

export default AutocompleteInput;
