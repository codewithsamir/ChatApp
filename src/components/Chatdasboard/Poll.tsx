import React, { useState } from 'react';
import { IoClose } from "react-icons/io5";

const Poll = ({ onSubmit,setShowPoll }:any) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [error, setError] = useState('');

  const handleOptionChange = (index:any, value:any) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index:any) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!question.trim() || options.some(option => !option.trim())) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    
    // Debugging output
    console.log('onSubmit:', onSubmit);
  
    if (typeof onSubmit === 'function') {
      onSubmit({ question, options });
    } else {
      console.error('onSubmit is not a function');
    }
  
    setQuestion('');
    setOptions(['']); // Reset to one empty option
  };
  

  return (
    <div className="p-4 bg-gray-700 text-white rounded w-full sm:w-[600px] relative">
      <h2 className="text-lg mb-2">Create a Poll</h2>
      <IoClose className='absolute right-2 top-2 text-2xl cursor-pointer'
      onClick={()=>{
        setShowPoll(false)
      }} />
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Poll Question"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div key={index + 1} className="flex mb-2">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 flex-1"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => handleRemoveOption(index)}
            >
              Remove
            </button>
          </div>
        ))}
    <div className="flex justify-between w-full">
    <button
          type="button"
          className="mt-2 text-green-500"
          onClick={handleAddOption}
        >
          Add Option
        </button>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="mt-4 p-2 bg-green-600 rounded"
        >
          Submit Poll
        </button>
    </div>
      </form>
    </div>
  );
};

export default Poll;
