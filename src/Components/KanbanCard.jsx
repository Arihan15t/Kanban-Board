import React from 'react';
import './KanbanCard.css'; // Add CSS for styling


const KanbanCard = ({ ticket, user }) => {
    // Function to get the user image based on the user's name
    const getUserImage = (name) => {
      switch (name) {
        case 'Anoop sharma':
          return '/src/assets/icons_FEtask/Anoop sharma.svg';
        case 'Yogesh':
          return '/src/assets/icons_FEtask/Yogesh.svg'; // Assuming this is Yogesh's image path
        case 'Shankar Kumar':
          return '/src/assets/icons_FEtask/Shankar Kumar.svg';
        case 'Ramesh':
          return '/src/assets/icons_FEtask/Ramesh.svg';
        case 'Suresh':
          return '/src/assets/icons_FEtask/Suresh.svg';
        default:
          return null; // No specific image available, fallback to initials
      }
    };
  
    // Get the initials from the user's name (fallback if no image is available)
    const getInitials = (name) => {
      return name.split(' ').map((n) => n[0]).join('');
    };
  
    const userImage = getUserImage(user.name);
  
    return (
      <div className="kanban-card">
        <div className="card-header">
          <span className="ticket-id">{ticket.id}</span>
          {userImage ? (
            <img src={userImage} alt={`${user.name} icon`} className="user-image" />
          ) : (
            <span className="user-initials">{getInitials(user.name)}</span>
          )}
        </div>
        <h3 className="ticket-title">{ticket.title}</h3>
        <div className="ticket-tag">
       
      { ticket.tag.map((tag, index) => (
        <div key={index} className="tag-container">
        <div className="dots-box">...</div> {/* Box for the three dots */}
        {ticket.id !== 'CAM-1' && (
          <div className="tag-box">
            <span className="tag">{tag}</span> {/* Box for the tag */}
          </div>
        )}
      </div>
    ))}

     </div>
      </div>
    );
  };
  
  export default KanbanCard;
  