"use client";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const EditorChat = ({ email, id, profileImage, name }: any) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [message, setmessage] = useState("");

  const submitMessage = () => {
    const payload = {
      email,
      id,
      profileImage,
      name,
      message,
    };
    dispatch(AddMessage({ payload, onSuccess: () => {} }));
    console.log(payload);
    setmessage("");
  };
  return (
    <div className="chat-cover w-full flex flex-col gap-8 mb-10">
      <div className=" w-full bg-[#0c1526] h-[150px] rounded-xl overflow-hidden py-2">
        <textarea
          placeholder="Write a Comment..."
          rows={4}
          value={message}
          onChange={(e) => setmessage(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && submitMessage()}
          className="flex w-full rounded-md border-none outline-none min-h-[120px]bg-[#0c1526] px-3 py-2 text-sm placeholder:text-slate-500 cursor-pointer border border-[#0c1526] bg-[#0c1526] resize-none"
        />
        <div className="flex justify-between px-4">
          <span className="mt-1 text-lg">@</span>
          <span onClick={submitMessage} className="cursor-pointer">
            <Image
              src="/assets/icons/Button.svg"
              alt="Send"
              width={40}
              height={40}
            />
          </span>
        </div>
      </div>
      <div className=" w-full bg-[#0c1526] h-auto rounded-xl overflow-hidden pt-2">
        <div className="py-4 px-4" id="message">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-3">
              {" "}
              <Image
                src="/assets/images/Avatar.png"
                alt={"Ahsan Iqbal"}
                width={100}
                height={100}
                className="inline-block size-8 rounded-full ring-2 ring-dark-100"
              />
              <span className="text-lg font-semibold">Ahsan Iqbal</span>
            </div>
            <div className="text-slate-400 text-sm">22 hours ago</div>
          </div>
          <div className="flex bg-[#11203d] py-3 px-3 rounded-lg mt-2">
            <h2 className="text-white">Can you Make it more interesting?</h2>
          </div>
        </div>
        <div className="py-4 px-4" id="message">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-3">
              {" "}
              <Image
                src="/assets/images/avatardocter.png"
                alt={"Ahsan Iqbal"}
                width={100}
                height={100}
                className="inline-block size-8 rounded-full ring-2 ring-dark-100"
              />
              <span className="text-lg font-semibold">Waseem Sajjad</span>
            </div>
            <div className="text-slate-400 text-sm">22 hours ago</div>
          </div>
          <div className="flex bg-[#11203d] py-3 px-3 rounded-lg mt-2">
            <h2 className="text-white">
              Yeah, sure. I was thinking about adding live comment feature to
              the application, what do you think about it? Do you have any other
              ideas which we can implement?
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center bg-[#101b2d] h-[50px] mt-2">
          <textarea
            placeholder="Reply to thread..."
            rows={1}
            className="flex w-[90%] rounded-md border-none outline-none min-h-[120px]bg-[#0c1526] px-3 py-2 text-sm placeholder:text-white cursor-pointer border border-[#101b2d] bg-[#101b2d] resize-none text-white"
          />
          <Image
            src="/assets/icons/Button.svg"
            alt="Send"
            width={40}
            height={40}
            className="mt-5 mr-2"
          />
        </div>
      </div>
      <div className=" w-full bg-[#0c1526] h-auto rounded-xl overflow-hidden pt-2">
        <div className="py-4 px-4" id="message">
          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-3">
              {" "}
              <Image
                src="/assets/images/Avatar.png"
                alt={"Ahsan Iqbal"}
                width={100}
                height={100}
                className="inline-block size-8 rounded-full ring-2 ring-dark-100"
              />
              <span className="text-lg font-semibold">Ahsan Iqbal</span>
            </div>
            <div className="text-slate-400 text-sm">2 hours ago</div>
          </div>
          <div className="flex bg-[#11203d] py-3 px-3 rounded-lg mt-2">
            <h2 className="text-white">What update?</h2>
          </div>
        </div>
        <div className="flex justify-between items-center bg-[#101b2d] h-[50px] mt-2">
          <textarea
            placeholder="Reply to thread..."
            rows={1}
            className="flex w-[90%] rounded-md border-none outline-none min-h-[120px]bg-[#0c1526] px-3 py-2 text-sm placeholder:text-white cursor-pointer border border-[#101b2d] bg-[#101b2d] resize-none text-white"
          />
          <Image
            src="/assets/icons/Button.svg"
            alt="Send"
            width={40}
            height={40}
            className="mt-5 mr-2"
          />
        </div>
      </div>
    </div>
  );
};

export default EditorChat;
