import React, { useEffect, useState } from 'react';

const RecordHolders = ({ score, gameOver }) => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(true);
  const [name, setName] = useState('');
  const url = 'https://snake-game-ls0c.onrender.com';
  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch(`${url}/api/records`);
      const data = await response.json();
      setRecords(data);
    };

    fetchRecords();
    setForm(true);
  }, []);

  const handleAddRecord = async () => {
    try {
      const response = await fetch(`${url}/api/records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      });

      const data = await response.json();
      console.log('Record added:', data);
      setRecords([...records, data]);
    } catch (error) {
      console.error('Error adding record:', error);
    }
    setForm(false);
  };

  return (
    <div className="record-holders">
      <h3>Record Holders</h3>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            {record.name}: {record.score}
          </li>
        ))}
      </ul>
      {gameOver && form && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input type="number" placeholder="Score" value={score} />
          <button onClick={handleAddRecord}>Add Record</button>
        </div>
      )}
    </div>
  );
};

export default RecordHolders;
