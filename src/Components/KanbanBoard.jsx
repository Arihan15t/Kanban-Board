import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';

const KanbanBoard = ({ tickets = [], users = [], grouping, ordering }) => {
  // Helper function to get a user object by userId
  const getUserById = (userId) => users.find((user) => user.id === userId);

  // Map priority values to custom labels
  const priorityLabels = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority',
  };

  // Group tickets based on the current 'grouping' value (status, userId, priority)
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

  // Function to get the appropriate icon based on the group
  const getGroupIcon = (group) => {
    if (grouping === 'userId') {
      switch (group) {
        case 'Anoop sharma':
          return '/src/assets/Pics/Anoop sharma.png';
        case 'Yogesh':
          return '/src/assets/Pics/Yogesh.png';
        case 'Shankar Kumar':
          return '/src/assets/Pics/Shankar Kumar.png';
        case 'Ramesh':
          return '/src/assets/Pics/Ramesh.png';
        case 'Suresh':
          return '/src/assets/Pics/Suresh.png';
        default:
          return '/src/assets/Pics/default-user.png';
      }
    }

    if (grouping === 'priority') {
      const priorityMatch = group.match(/Priority (\d+)/);
      if (priorityMatch) {
        const priority = parseInt(priorityMatch[1], 10);
        switch (priority) {
          case 4:
            return '/src/assets/Pics/SVG - Urgent Priority colour.png';
          case 3:
            return '/src/assets/Pics/Img - High Priority.png';
          case 2:
            return '/src/assets/Pics/Img - Medium Priority.png';
          case 1:
            return '/src/assets/Pics/Img - Low Priority.png';
          case 0:
            return '/src/assets/Pics/No-priority.png';
          default:
            return null;
        }
      }
    }

    if (grouping === 'status') {
      switch (group) {
        case 'Todo':
          return '/src/assets/Pics/To-do.png';
        case 'In progress':
          return '/src/assets/Pics/in-progress.png';
        case 'Backlog':
          return '/src/assets/Pics/Backlog.png';
        default:
          return '/src/assets/Pics/Cancelled.png';
      }
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
                alt={`${group} icon`}
                className="group-icon"
                style={{ marginRight: '8px', width: '12px', height: '12px' }}
              />
              {getPriorityLabel(group)} {items.length}
            </h2>
            <div className="icons">
              <img src="/src/assets/Pics/add.png" alt="Add icon" className="add-icon" />
              <img src="/src/assets/Pics/3 dot menu.png" alt="Menu icon" className="menu-icon" />
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
