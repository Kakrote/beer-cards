import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [beer, setBeer] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://api.sampleapis.com/beers/ale')
      .then(response => setBeer(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredBeers = beer.filter(beer =>
    beer.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-600 mb-4">Beer Finder..</h1>
        <input
          type="text"
          placeholder="Search for a beer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border-2 border-yellow-400 rounded-lg w-80"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="bg-slate-50 p-4 rounded-lg shadow-md">
            <img
              src={beer.image}
              alt={beer.name}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold">{beer.name}</h2>
            <p className="text-gray-600">{beer.price || 'Price not available'}</p>
            <span className="text-gray-600 flex gap-3"><h1 className='text-slate-900 font-bold'>Rating</h1> {beer.rating?.average ? beer.rating.average.toFixed(1):"NA"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
