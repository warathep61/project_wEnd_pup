import React, { useEffect, useState } from 'react';

export default function Home() {
  const [legends, setLegends] = useState([]);

  useEffect(() => {
    // Fetch ข้อมูลจาก API
    fetch('http://127.0.0.1:8000/api/apex')
      .then(response => response.json())
      .then(data => {
        setLegends(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-4xl text-yellow-400 font-bold text-center mb-8">Apex Legends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {legends.map((legend, index) => (
          <div key={index} className="bg-gray-800 border border-yellow-500 rounded-lg p-6 shadow-lg">
            <img 
                src={legend.img} 
                alt={legend.legend_name} 
                className="w-full h-48 object-cover rounded-lg mb-4" // จัดขนาดภาพให้เต็มความกว้างและสูง 48 (customize ได้)
            />
            <h2 className="text-xl text-yellow-300 font-semibold">{legend.legend_name}</h2>
            <p className="text-gray-300"><strong>Role:</strong> {legend.role}</p>
            <p className="text-gray-300"><strong>Passive Ability:</strong> {legend.passive_ability}</p>
            <p className="text-gray-300"><strong>Tactical Ability:</strong> {legend.tactical_ability}</p>
            <p className="text-gray-300"><strong>Ultimate Ability:</strong> {legend.ultimate_ability}</p>
            <p className="text-gray-300"><strong>Health:</strong> {legend.health}</p>
            <p className="text-gray-300"><strong>Shield:</strong> {legend.shield}</p>
            <p className="text-gray-300"><strong>Weapon Favorite:</strong> {legend.weapon_favorite}</p>
            <p className="text-gray-300"><strong>Speed:</strong> {legend.speed}</p>
            <p className="text-gray-300"><strong>Home World:</strong> {legend.home_world}</p>
            <p className="text-gray-400"><strong>Lore:</strong> {legend.lore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
