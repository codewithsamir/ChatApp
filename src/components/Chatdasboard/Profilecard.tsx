import React from 'react';

type ProfileCardProps = {
  name: string;
  image: string;
  email: string;
  status: string;  // New prop for the user's status message
  lastSeen: string; // New prop for last seen time
  onClose: () => void; // Function to close the profile card
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, image, email, status, lastSeen, onClose }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-[300px] shadow-lg relative">
      {/* Close Button */}
      <button onClick={onClose} className="text-gray-400 hover:text-white absolute top-2 right-2">
        ✖️
      </button>

      {/* Profile Information */}
      <div className="flex items-center space-x-4 mb-4">
        <img src={image} alt="Profile" className="w-16 h-16 rounded-full border-2 border-yellow-500" />
        <div>
          <h3 className="text-xl text-white font-semibold">{name}</h3>
          <p className="text-sm text-gray-400">{email}</p>
        </div>
      </div>

      {/* Status and Last Seen */}
      <div className="mb-4">
        <p className="text-sm text-gray-400">Status: {status}</p>
        <p className="text-sm text-gray-400">Last seen: {lastSeen}</p>
      </div>

      {/* Profile Actions */}
     
    </div>
  );
};

export default ProfileCard;
