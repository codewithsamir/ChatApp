import React from 'react';

const Herosection = () => {
  return (
    <section className="w-full h-[85vh] flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 to-blue-200 relative p-5 md:p-10">
      <div className="image w-full md:w-1/2 h-full relative">
        <img
          // src="/hero.png"
          src="/hero.png"
          alt="Hero"
          className="w-full h-full object-cover rounded-lg "
        />
      </div>
      <div className="info w-full md:w-1/2 z-10 text-center md:text-left p-5 md:p-10 text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5">
          “Welcome to the New Era of Chat”
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-5">
          Experience seamless and intuitive conversations with our state-of-the-art chat application. Connect, communicate, and conquer the digital world like never before.
        </p>
        <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded-lg mt-5 shadow-lg transition transform hover:scale-105">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Herosection;
