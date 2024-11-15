import React from 'react';

type ProfileCardProps = {
  onClose: () => void; // Function to close the profile card
};

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose }) => {
  // Hardcoded data for the profile
  const name = "Broky";
  const image = "https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww"; // Replace with the actual URL of the profile image
  const phoneNumber = "+977 0000000000";
  const status = "Available";

  return (
    <div className="bg-gray-900 p-6 rounded-lg w-[300px] shadow-lg relative text-white">
      {/* Close Button */}
      <button onClick={onClose} className="text-gray-400 hover:text-white absolute top-3 right-3">
        ✖️
      </button>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src={image}
          alt="Profile"
          className="w-20 h-20 rounded-full border-4 border-gray-700  object-cover"
        />
      </div>

      {/* Profile Information */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-gray-400">About</p>
        <p className="text-sm text-yellow-500">{status}</p>
      </div>

      {/* Phone Number */}
      <div className="text-center mb-4">
        <p className="text-gray-400">Phone number</p>
        <p className="text-sm">{phoneNumber}</p>
      </div>

      {/* Logout Button */}
      <div className="text-center">
        <button
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
          onClick={onClose}
        >
          Log out
        </button>
      </div>

      {/* Info Note */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Chat history on this computer will be cleared when you log out.
      </p>
    </div>
  );
};

export default ProfileCard;
