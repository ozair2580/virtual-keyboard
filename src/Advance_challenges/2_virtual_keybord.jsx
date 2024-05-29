import React, { useState } from "react";

const keyboardKeys = [
  { key: "1", characters: ["1", "!"] },
  { key: "2", characters: ["2", "@"] },
  { key: "3", characters: ["3", "#"] },
  { key: "4", characters: ["4", "$"] },
  { key: "5", characters: ["5", "%"] },
  { key: "6", characters: ["6", "^"] },
  { key: "7", characters: ["7", "&"] },
  { key: "8", characters: ["8", "*"] },
  { key: "9", characters: ["9", "("] },
  { key: "0", characters: ["0", ")"] },
  { key: "Q", characters: ["Q", "q"] },
  { key: "W", characters: ["W", "w"] },
  { key: "E", characters: ["E", "e"] },
  { key: "R", characters: ["R", "r"] },
  { key: "T", characters: ["T", "t"] },
  { key: "Y", characters: ["Y", "y"] },
  { key: "U", characters: ["U", "u"] },
  { key: "I", characters: ["I", "i"] },
  { key: "O", characters: ["O", "o"] },
  { key: "P", characters: ["P", "p"] },
  { key: "A", characters: ["A", "a"] },
  { key: "S", characters: ["S", "s"] },
  { key: "D", characters: ["D", "d"] },
  { key: "F", characters: ["F", "f"] },
  { key: "G", characters: ["G", "g"] },
  { key: "H", characters: ["H", "h"] },
  { key: "J", characters: ["J", "j"] },
  { key: "K", characters: ["K", "k"] },
  { key: "L", characters: ["L", "l"] },
  { key: "Z", characters: ["Z", "z"] },
  { key: "X", characters: ["X", "x"] },
  { key: "C", characters: ["C", "c"] },
  { key: "V", characters: ["V", "v"] },
  { key: "B", characters: ["B", "b"] },
  { key: "N", characters: ["N", "n"] },
  { key: "M", characters: ["M", "m"] },
  { key: "Backspace", characters: ["Backspace"] },
  { key: "Space", characters: [" "] },
  { key: "Shift", characters: ["Shift"] },
  {key:"ctrl",characters:["ctrl"]},
  {key:"paste",characters:["paste"]},
  {key:"undo",characters:["undo"]}
];

const VirtualKeyboard = () => {
  const [inputs, setInputs] = useState(Array.from({ length: 3 }, () => ""));
  const [focusIndex, setFocusIndex] = useState(null);
  const [shiftval, setShiftval] = useState(false);
  const [ctrlval,setctrlval]=useState(false)
  const [selectval,setselectval]=useState("");
  const [cutvalue,setcutvalue]=useState("");
  const [paste,setpaste]=useState(false)

  const handleClick = (item) => {
    const [first, second] = item;

    
    
    if (focusIndex !== null) {
      const updatedInputs = [...inputs];
        if (first === "Shift") {
        setShiftval(!shiftval);
      } 
      else if(first==="ctrl"){
        setctrlval(!ctrlval)
      }
      else if (first === "Backspace") {
        updatedInputs[focusIndex] = updatedInputs[focusIndex].slice(0, -1);
      }
      else if(ctrlval&&first==="X"){
        const selectedText = selectval;
        updatedInputs[focusIndex]=" "
          setcutvalue(selectedText)
      }
      else if(ctrlval&&first==="C"){
        const selectedText = selectval;
          setcutvalue(selectedText)
      }
      else if(first==="paste"){
         setpaste(!paste)
      }

      else if(first==="undo"){
        updatedInputs[focusIndex] = updatedInputs[focusIndex].slice(0, -1);
        setcutvalue(" ")

      }
      else {
        if (shiftval && second) {
          updatedInputs[focusIndex] += second;
        } 
            else {
          updatedInputs[focusIndex] += first;
        }
      }
      
      setInputs(updatedInputs);
    }

  };
  console.log(cutvalue)
  return (
    <div>
        <h1>{paste&&cutvalue}</h1>
      {inputs.map((value, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Input ${index + 1}`}
          value={value}
          onFocus={() => setFocusIndex(index)}
          onSelect={(e)=>setselectval(e.target.value.substring(e.target.selectionStart,e.target.selectionEnd))}
          readOnly
        />
      ))}
      <br />

      {keyboardKeys.map((item) => (
        <button key={item.key} onClick={() => handleClick(item.characters)}>
          {item.key}
        </button>
      ))}
    </div>
  );
};

export default VirtualKeyboard;
