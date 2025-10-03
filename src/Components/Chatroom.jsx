import groq from "../utils/groqAi";
import React, { useRef, useState } from "react";
const Chatroom = () => {
  const serachText = useRef();
  const [response, setResponse] = useState("")
  const getPreciseResponse = async () => {
    setResponse("Gemini is Thinking...")
    const prompt =
      "You are a highly intelligent assistant like Gemini/Groq.Answer the following query dynamically and precisely. Format the response so it is visually appealing, clear, and easy to read. Use proper spacing, bullet points, numbering, or short paragraphs where appropriate. Do NOT use raw tables, markdown code blocks, or unnecessary explanations. Query: " +
      serachText.current.value;
    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "openai/gpt-oss-20b",
      });
      serachText.current.value = ""
      setResponse(chatCompletion.choices[0]?.message?.content || "");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <div>
        <input ref={serachText} type="text" placeholder="Ask Gemini"></input>
        <button onClick={getPreciseResponse}>send</button>
        <div>
            {response}
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
