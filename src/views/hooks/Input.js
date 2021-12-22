import { useState } from "react";

const useInput = (regex, isListening) => {
  const [enteredInput, setEnteredInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateInput = () => {
    if (regex) {
      return regex.test(enteredInput);
    }
  };
  const inputIsValid = validateInput();
  const hasError = !inputIsValid && isTouched;
  const isTyping = enteredInput.length > 0 && !isListening;

  let errorType;
  if (!inputIsValid) errorType = "INVALID";
  if (isTouched && enteredInput.length === 0) errorType = "EMPTY";

  const inputChangeHandler = (event) => {
    setEnteredInput(event.target.value);
  };

  const blurChangeHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredInput("");
    setIsTouched(false);
  };

  const setTranscript = (transcript) => {
    setEnteredInput(transcript);
  };

  return {
    enteredInput,
    inputChangeHandler,
    blurChangeHandler,
    isTouched,
    hasError,
    resetInput,
    isValid: inputIsValid,
    isTyping,
    setTranscript,
    errorType,
  };
};

export default useInput;
