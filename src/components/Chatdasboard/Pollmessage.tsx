import React, { useState, useEffect } from 'react';

type PollProps = {
  msg: {
    poll: {
      question: string;
      options: string[];
      votes: number[]; // Array to track the votes for each option
    };
  };
  totalVotes: number;
  handlePollVote: (voteData: { question: string; selectedOption: string }) => void;
};

const Pollmessage: React.FC<PollProps> = ({ msg, totalVotes, handlePollVote }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // This effect ensures that when the message data changes, we reset the selected option
  useEffect(() => {
    setSelectedOption(null);
  }, [msg]);

  // Handles the change in the selected vote option
  const handleVoteChange = (option: string) => {
    setSelectedOption(option);
    handlePollVote({ question: msg.poll.question, selectedOption: option });
  };

  return (
    <div className="w-[500px] p-4 rounded-lg bg-white shadow-lg">
      <h4 className="text-xl font-bold mb-4">Poll: {msg?.poll?.question}</h4>
      <div className="space-y-3">
        {msg.poll.options.map((option, idx) => {
          const optionVotes = msg.poll.votes[idx];
          const percentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;

          return (
            <div key={option} className="flex flex-col">
              <label className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`poll-${msg?.poll?.question}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleVoteChange(option)}
                  className="mr-2 h-5 w-5"
                />
                {option}
              </label>
              <div className="relative h-2 bg-gray-200 rounded-full mt-1">
                <div
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 mt-1">{optionVotes} vote(s) ({percentage.toFixed(1)}%)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pollmessage;
