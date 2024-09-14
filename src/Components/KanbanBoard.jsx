import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';
import { assets } from '../assets/assets'; 

const KanbanBoard = ({ tickets = [], users = [], grouping, ordering }) => {

  const getUserById = (userId) => users.find((user) => user.id === userId);


  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  const groupTickets = (tickets) => {
    if (!Array.isArray(tickets)) return [];

    const grouped = tickets.reduce((acc, ticket) => {
      let groupKey = ticket[grouping];

      if (grouping === 'userId') {
        const user = getUserById(ticket.userId);
        groupKey = user ? user.name : 'Unassigned';
      } else if (grouping === 'priority') {
        groupKey = `Priority ${ticket.priority}`;
      }

      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(ticket);
      return acc;
    }, {});

    const groupedArray = Object.keys(grouped).map((group) => ({
      group,
      items: grouped[group],
    }));

    if (grouping === 'status') {
      groupedArray.push({
        group: 'Canceled',
        items: [],
      });
    }

    return groupedArray;
  };

  // Sort tickets based on 'ordering' value (priority, title)
  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (ordering === 'priority') {
        return a.priority - b.priority;
      } else if (ordering === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  // Function to display custom labels for priority groupings
  const getPriorityLabel = (group) => {
    const priorityMatch = group.match(/Priority (\d+)/);
    if (priorityMatch) {
      const priority = parseInt(priorityMatch[1], 10);
      return priorityLabels[priority];
    }
    return group;
  };

  // Function to get the appropriate icon based on the group using assets
  const getGroupIcon = (group) => {
    // User icon mapping
    const userIcons = {
      'anoop sharma': assets.Anoop_Sharma,
      'yogesh': assets.Yogesh,
      'shankar kumar': assets.Shankar_Kumar,
      'ramesh': assets.Ramesh,
      'suresh': assets.Suresh,
    };

    // Priority icon mapping
    const priorityIcons = {
      4: assets.Urgent_Priority_Color,
      3: assets.High_Priority,
      2: assets.Medium_Priority,
      1: assets.Low_Priority,
      0: assets.No_Priority,
    };

    // Status icon mapping
    const statusIcons = {
      'Todo': assets.To_do,
      'In progress': assets.In_Progress,
      'Backlog': assets.Backlog,
      'Canceled': assets.Canceled,
    };

    // Determine group type
    if (grouping === 'userId') {
      return userIcons[group.toLowerCase()] || assets.Default_User;
    }

    if (grouping === 'priority') {
      const priorityMatch = group.match(/Priority (\d+)/);
      if (priorityMatch) {
        const priority = parseInt(priorityMatch[1], 10);
        return priorityIcons[priority] || null;
      }
    }

    if (grouping === 'status') {
      return statusIcons[group] || assets.Cancelled;
    }

    return null;
  };

  // First group the tickets, then sort each group
  const groupedTickets = groupTickets(tickets);
  const sortedTickets = groupedTickets.map(({ group, items }) => ({
    group,
    items: sortTickets(items),
  }));

  return (
    <div className="kanban-board">
      {sortedTickets.map(({ group, items }) => (
        <div key={group} className="kanban-column">
          <div className="kanban-header">
            <h2>
              <img
                src={getGroupIcon(group)}
                className="group-icon"
                style={{ marginRight: '8px', width: '12px', height: '12px' }}
                alt={`${group}-icon`}
              />
              {getPriorityLabel(group)} {items.length}
            </h2>
            <div className="icons">
              <img src={assets.add} className="add-icon" alt="add-icon" />
              <img src={assets.dot_menu_3} className="menu-icon" alt="menu-icon" />
            </div>
          </div>
          {items.length > 0 ? (
            items.map((ticket) => (
              <KanbanCard key={ticket.id} ticket={ticket} user={getUserById(ticket.userId)} />
            ))
          ) : (
            <p></p>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
