import "./App.css";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

function App() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [openCardIndex, setOpenCardIndex] = useState(null);

  const handleChange = (event, index) => {
    setOpenCardIndex(index);
  };

  const handleRemoveCheckbox = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    setOpenCardIndex(null);
  };

  return (
    <div className="App">
      <h1 style={{ color: "black" }}>list</h1>
      <center>
        {data.map((dataObj, index) => {
          const isCardOpen = openCardIndex === index;

          return (
            <div
              key={index}
              style={{
                width: "15em",
                backgroundColor: "#fff",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p>
                <Checkbox
                  checked={isCardOpen}
                  onChange={(event) => handleChange(event, index)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                {dataObj.name}
              </p>
              {isCardOpen && (
                <Card>
                  {/* Card content */}
                  <p>{dataObj.email}</p>
                  <p>{dataObj.phone}</p>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveCheckbox(index)}
                  >
                    Remove Checkbox
                  </Button>
                </Card>
              )}
            </div>
          );
        })}
      </center>
    </div>
  );
}

export default App;
