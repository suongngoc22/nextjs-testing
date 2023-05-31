"use client";
import { useAuth } from "@/app/AuthContext";
import { useState } from "react";

const Form = () => {
  const [emailTo, setEmailTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSendSuccess, setIsSendSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // send email
    try {
      const res = await fetch("./api/sendgrid", {
        body: JSON.stringify({
          receiver: emailTo,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.status === 200) {
        setIsSendSuccess(true);
        setTimeout(() => setIsSendSuccess(null), 3000);
      }
    } catch (error) {
      setIsSendSuccess(false);
      setTimeout(() => setIsSendSuccess(null), 3000);
      console.log(error);
      return;
    }

    // Reset form fields
    setEmailTo("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
      <h2 className="text-3xl font-semibold uppercase text-center my-8">
        Send email
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[300px] mx-auto items-center justify-center text-sm gap-4"
      >
        <div className="flex flex-col w-full">
          <label htmlFor="emailTo" className="block mb-1">
            To:
          </label>
          <input
            type="email"
            id="emailTo"
            value={emailTo}
            onChange={(e) => setEmailTo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="subject" className="block mb-1">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col w-full">
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[160px] px-4 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize"
            required
          />
        </div>
        {isSendSuccess !== null && (
          <span
            className={`${isSendSuccess ? "text-green-500" : "text-red-600"}`}
          >
            {isSendSuccess ? "Successfully sent!" : "Cannot sent email!"}
          </span>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Form;
