const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    imageUrl: 'https://via.placeholder.com/600x400',
    bio: 'Full Stack Developer with a passion for building scalable applications.',
    phone: '+1234567890',
    location: 'San Francisco, CA',
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 mt-24">
      {/* Left Container */}
      <div className="md:w-2/3 bg-gray-900 p-6 rounded-lg shadow-lg">
        <img
          src={user.imageUrl}
          alt={user.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h1 className="text-4xl font-bold mb-4" style={{ color: '#3cd7b8' }}>
          {user.name}
        </h1>
        <h2 className="text-2xl font-semibold mb-2">Email</h2>
        <p className="text-gray-300 mb-4">{user.email}</p>
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p className="text-gray-300 mb-4">{user.bio}</p>
        <button className="mt-4 bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600">
          Update Details
        </button>
      </div>

      {/* Right Container */}
      <div className="md:w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Contact Details</h3>
        <p className="text-gray-300 mb-4">Phone: {user.phone}</p>
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <p className="text-gray-300 mb-4">{user.location}</p>
      </div>
    </div>
  );
};

export default Profile;
