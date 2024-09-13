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
          return '/src/assets/icons_FEtask/Anoop sharma.svg';
        case 'Yogesh':
          return '/src/assets/icons_FEtask/Yogesh.svg';
        case 'Shankar Kumar':
          return '/src/assets/icons_FEtask/Shankar Kumar.svg';
        case 'Ramesh':
          return '/src/assets/icons_FEtask/Ramesh.svg';
        case 'Suresh':
          return '/src/assets/icons_FEtask/Suresh.svg';
        default:
          return '/src/assets/icons_FEtask/default-user.svg';
      }
    }

    if (grouping === 'priority') {
      const priorityMatch = group.match(/Priority (\d+)/);
      if (priorityMatch) {
        const priority = parseInt(priorityMatch[1], 10);
        switch (priority) {
          case 4:
            return '/src/assets/icons_FEtask/SVG - Urgent Priority colour.svg';
          case 3:
            return '/src/assets/icons_FEtask/Img - High Priority.svg';
          case 2:
            return '/src/assets/icons_FEtask/Img - Medium Priority.svg';
          case 1:
            return '/src/assets/icons_FEtask/Img - Low Priority.svg';
          case 0:
            return '/src/assets/icons_FEtask/No-priority.svg';
          default:
            return null;
        }
      }
    }

    if (grouping === 'status') {
      switch (group) {
        case 'Todo':
          return '/src/assets/icons_FEtask/To-do.svg';
        case 'In progress':
          return '/src/assets/icons_FEtask/in-progress.svg';
        case 'Backlog':
          return '/src/assets/icons_FEtask/Backlog.svg';
        default:
          return '/src/assets/icons_FEtask/Cancelled.svg';
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
              <img src="/src/assets/icons_FEtask/add.svg" alt="Add icon" className="add-icon" />
              <img src="/src/assets/icons_FEtask/3 dot menu.svg" alt="Menu icon" className="menu-icon" />
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
