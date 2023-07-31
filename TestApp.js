// import React, { useState } from "react";

// const MyComponent = () => {
//   const [response, setResponse] = useState(null);

//   const handlePostRequest = async () => {
//     const url = "http://127.0.0.1:8000/llm_chain.chain/run";
//     const data = {
//       query: "how can I contact NCAIR?",
//     };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const jsonData = await response.json();
//       setResponse(jsonData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handlePostRequest}>Make POST Request</button>
//       {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
//     </div>
//   );
// };

// export default MyComponent;

const url = "http://127.0.0.1:8000/chatbot.chain/run";

const postData = {
  query: "What is NCAIR?",
};

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postData),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Response:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
