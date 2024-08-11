import React from "react";
import EditorChat from "./EditorChat";

const Document = () => {
  return (
    <section className="w-full flex px-10">
      <div className="w-[70%] flex justify-center items-center">
        <h2>Document</h2>
      </div>
      <div className="w-[30%] min-h-screen px-5 py-8">
        <EditorChat />
      </div>
    </section>
  );
};

export default Document;
