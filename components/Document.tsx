import React from "react";
import EditorChat from "./EditorChat";

const Document = ({ clerkUser }: any) => {
  return (
    <section className="w-full flex px-10">
      <div className="w-[70%] flex justify-center items-center">
        <h2>Document</h2>
      </div>
      <div className="w-[30%] px-5 py-8 max-h-[100vh] overflow-y-auto">
        <EditorChat
          email={clerkUser.emailAddresses[0].emailAddress}
          id={clerkUser.id}
          profileImage={clerkUser.imageUrl}
          name={clerkUser.firstName + " " + clerkUser.lastName}
        />
      </div>
    </section>
  );
};

export default Document;
