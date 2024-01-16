import { KeyboardEvent, useRef, useState } from "react";

interface Person {
  name: string;
  email: string;
}

const sampleArray = [
  { name: "Rohit Sharma", email: "rohit.sharma@example.com" },
  { name: "Virat Kohli", email: "virat.kohli@example.com" },
  { name: "Yashaswi Jaiswal", email: "yashaswi.jaiswal@example.com" },
];

const Tags = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Person[]>(sampleArray);
  const [selectedPersons, setSelectedPersons] = useState<Person[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    setInputValue(value);

    const filteredSuggestions = sampleArray.filter(
      (person) =>
        !selectedPersons.some((selectedPerson) => selectedPerson.name === person.name) &&
        (person.name.toLowerCase().includes(value.toLowerCase()) || person.email.toString().includes(value))
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (person: Person) => {
    setSelectedPersons([...selectedPersons, person]);
    setInputValue("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setSuggestions((prevSuggestions) => prevSuggestions.filter((suggestion) => suggestion.name !== person.name));
  };

  const handleRemove = (person: Person) => {
    setSelectedPersons((prevSelectedPersons) => prevSelectedPersons.filter((p) => p.name !== person.name));
    setSuggestions((prevSuggestions) => [...prevSuggestions, person]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  };

  return (
    <div className="relative w-200 mx-auto">
      <div className="relative">
        <div className="flex flex-wrap">
          {selectedPersons.map((person) => (
            <div key={person.name} className="inline-block bg-gray-200 p-2 rounded mx-1">
              <span className="mr-2">{person.name}</span>
              <button onClick={() => handleRemove(person)} className="text-red-500 cursor-pointer">
                X
              </button>
            </div>
          ))}
          <input
            ref={inputRef}
            type="text"
            placeholder="Click on Player"
            className="border border-transparent border-b-2 border-blue-500 p-2 w-full focus:outline-none"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {inputValue.length === 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-32 overflow-y-auto">
          {suggestions.map((person) => (
            <div
              key={person.name}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(person)}
            >
              {person.name} ({person.email})
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
