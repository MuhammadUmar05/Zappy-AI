import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[92vh] overflow-hidden flex justify-center items-center bg-light_primary dark:bg-dark_primary">
      <section className="flex flex-col gap-4 items-center dark:text-light_primary text-dark_primary md:p-6 p-3">
        <p className="text-3xl font-semibold tracking-wide">
          Hello, I'm FLASH-2.0
        </p>
        <p className="text-center text-lg">
          I'm a versatile AI language model that can write and generate images.
          Want to try me out?
        </p>
        <button
          onClick={() => navigate("/chatAI")}
          className="rounded-xl bg-primary text-white py-3 md:px-40 px-24 font-medium"
        >
          Start Chatting AI
        </button>
        <button
          onClick={() => navigate("/generateImage")}
          className="rounded-xl bg-light_secondary dark:bg-dark_secondary dark:text-white text-dark_primary py-3 md:px-40 px-24 font-medium"
        >
          Generate Images
        </button>
      </section>
    </div>
  );
}

export default Home;
