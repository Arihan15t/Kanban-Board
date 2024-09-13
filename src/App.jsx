import React, { useEffect, useState } from 'react';
import KanbanBoard from './Components/KanbanBoard';
import Header from './Components/Header';
import { fetchTickets } from './Utils/Api'; // Adjust import based on your structure


function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status'); // default grouping by 'status'
  const [ordering, setOrdering] = useState('priority'); // default ordering by 'priority'

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets(); // Assuming your API returns { tickets, users }
      setTickets(data.tickets);
      setUsers(data.users);
    };
    getTickets();
  }, []);

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value); // Update grouping state
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value); // Update ordering state
  };

  return (
    <div className="app">
      {/* Pass props to Header */}
      <Header 
        grouping={grouping} 
        ordering={ordering} 
        handleGroupingChange={handleGroupingChange} 
        handleOrderingChange={handleOrderingChange} 
      />

      {/* Pass props to KanbanBoard */}
      <KanbanBoard tickets={tickets} users={users} grouping={grouping} ordering={ordering} />
    </div>
  );
}

export default App;
