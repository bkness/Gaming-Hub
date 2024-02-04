import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';

// Profile page function
const ProfilePage = () => {
  const [searchGames, setSearchedGames] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // API call for all games
  useEffect(() => {
    const getAllGames = async () => {
      const apiURL = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2023-08-01,2024-02-01&ordering=-added`;

      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllGames();
  }, []);

  // Function to handle searching a game in API
  const handleGameSearch = async () => {
    const searchURL = `https://api.rawg.io/api/games?key=9cdfe8e7af674d6d825da9805c8c6545&dates=2017-01-01,2024-01-01&added&page_size=9&search=-${searchGames}&search_precise`;

    try {
      const response = await fetch(searchURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data.results);
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching game', error);
    }
  };

  // Function to get each platform for a game and turn it into a string
  const getPlatformStr = (platforms) => {
    const platformStr = platforms.map(each => each.platform.name).join(", ");
    if(platformStr.length > 3) {
      return platformStr;
    } 
    return platformStr;
  }

  return (
    <div className='container'>
      <header className='my-4'>
        <h1>Welcome, User!</h1>
      </header>

      <div className='row'>
        <div className='col-md-4'>
          {/* Profile Pic */}
          <img
            src='https://via.placeholder.com/150' // Replace with the actual URL of the profile picture
            alt='Profile'
            className='img-fluid rounded-circle mb-3'
          />
        </div>
        <div className='col-md-8'>
          <h2>Currently Playing:</h2>
          <p>Game Title</p>
        </div>
      </div>

      <section className='my-4'>
        <h2>Wishlist</h2>
      </section>
      {/* Search Bar */}
      <div className='input-group mb-3'>
        <input
          type='text'
          placeholder='Search for games...'
          value={searchGames}
          onChange={(e) => setSearchedGames(e.target.value)}
        />
        <button onClick={handleGameSearch}>Search</button>
      </div>
      <div className='container'>
        <div className='row'>
          {searchResults.map((game) => (
            <div className='col-lg-3 col-md-6 col-sm-12' key={game.id}>
              <div className='item'>
                <img
                  src={game.background_image}
                  alt={game.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <h3>{game.name}</h3>
                <p>{game.rating}</p>
                <p>{getPlatformStr(game.parent_platforms)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
