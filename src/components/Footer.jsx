import React from "react";

export default function Footer() {
  return (
    <div className="sm:flex-col flex-row justify-between sm:py-20 px-20  bg-slate-800">
      <div className="sm:flex justify-between border-b-2 space-y-6 border-b-blue-200 py-5 ">
        <div>
          <h3 className="text-2xl font-bold py-8 text-white">Help </h3>
          <ul>
            <li className=" text-xl text-white">Help center</li>
            <li className=" text-xl text-white">Help Forum</li>
            <li className=" text-xl text-white">Help Video</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold py-8 text-white">Community </h3>

          <ul>
            <li className=" text-xl text-white">Blogger Buzz</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold py-8 text-white">Developers </h3>
          <ul>
            <li className=" text-xl text-white">Blogger API </li>
            <li className=" text-xl text-white">Developer Forum</li>
          </ul>
        </div>
      </div>
      <div className="flex md:flex-col lg:flex-col justify-around py-16">
        <h3 className="text-xl text-white">Term of Service</h3>
        <h3 className="text-xl text-white">Privacy</h3>
        <h3 className="text-xl text-white">Content Policy</h3>
      </div>
    </div>
  );
}
