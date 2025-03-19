import React, { useState } from "react";
import image from "../../assets/image.png";

function GenerateImage() {
  const [input, setInput] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_HUGGING_FACE_API_KEY;

  const generateImage = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      setInput("")
      const response = await fetch(
        "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            inputs: input, 
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const imgURL = URL.createObjectURL(blob); 
      console.log(imgURL);
      setImgUrl(imgURL); 
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-[92vh]  flex flex-col justify-center items-stretch bg-light_primary dark:bg-dark_primary gap-3 p-1">
      <p className="text-dark_primary dark:text-light_secondary text-2xl font-semibold text-center">
        Generate Image with <span className="text-primary">AI</span>
      </p>
      <div className="max-w-md">
        <img download
          src={imgUrl || image} 
          alt="Generated"
          className="w-full h-auto rounded-md p-2 dark:bg-dark_secondary bg-light_secondary"
        />
      </div>
      <button className="rounded-xl bg-primary text-white py-2 font-medium" ><a download={imgUrl || image} href={imgUrl || image}>Download Image</a></button>
      <div className="flex items-center gap-1 bg-light_secondary dark:bg-dark_secondary py-2 md:px-6 px-2 rounded-xl">
        <input
        onKeyDown={(e)=>{
          if(e.key === "Enter"){
            e.preventDefault()
            generateImage()
          }
        }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="flex-1 bg-transparent border-none outline-none md:placeholder:text-base placeholder:text-sm overflow-y-auto text-dark_primary dark:text-light_primary"
          placeholder="Describe what you want to see"
        />
        <button
          onClick={generateImage}
          className="bg-primary md:px-5 px-2 py-1 rounded-xl text-white flex items-center gap-2"
        >
          {loading ? "Generating" : "Generate"}
          {loading && <div className="animate-spin w-3 h-3 rounded-full border-white border-2 border-t-transparent"></div>}
        </button>
      </div>
    </div>
  );
}

export default GenerateImage;
