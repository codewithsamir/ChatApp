import React, { useState, useEffect } from 'react';

type PollProps = {
  msg: {
    question: string;
    options: string[];
    votes: number[];
  };
  totalVotes: any;
  handlePollVote: (voteData: { question: string; selectedOption: string }) => void;
};

const Pollmessage: React.FC<PollProps> = ({ msg, totalVotes, handlePollVote }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [localVotes, setLocalVotes] = useState<number[]>([]);

  useEffect(() => {
    setSelectedOption(null);
    setLocalVotes(Array.isArray(msg.votes) ? msg.votes : []);
  }, [msg]);

  const handleVoteChange = (option: string, idx: number) => {
    if (selectedOption === option) return;

    setSelectedOption(option);

    const updatedVotes = [...localVotes];
    updatedVotes[idx] += 1;
    setLocalVotes(updatedVotes);

    handlePollVote({ question: msg.question, selectedOption: option });
  };

  const updatedTotalVotes = localVotes.reduce((sum, votes) => sum + votes, 0);

  return (
    <div className="w-full px-6 py-2 rounded-xl bg-gray-800 shadow-lg">
      <h4 className="text-xl font-bold mb-6 text-white"> {msg.question}</h4>
      <div className="space-y-4">
        {msg.options.map((option, idx) => {
          const optionVotes = localVotes[idx] || 0;
          const percentage = updatedTotalVotes > 0 ? (optionVotes / updatedTotalVotes) * 100 : 0;
          const isSelected = selectedOption === option;

          return (
            <div key={option} className="flex flex-col rounded-lg">
              <label className="flex items-center mb-3 rounded-lg bg-gray-700 p-3 cursor-pointer">
                <input
                  type="radio"
                  name={`poll-${msg.question}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleVoteChange(option, idx)}
                  className="mr-4 h-5 w-5 cursor-pointer text-blue-500 focus:ring-2 focus:ring-blue-400 rounded-full"
                />
                <span className={`text-white ${isSelected ? 'font-semibold' : ''}`}>{option}</span>
              </label>
              <div className="relative h-2 bg-gray-600 rounded-full mt-2">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-width duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-1">
                {optionVotes} vote(s) ({percentage.toFixed(1)}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pollmessage;
