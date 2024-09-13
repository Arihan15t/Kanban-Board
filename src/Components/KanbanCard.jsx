import React from 'react';
import './KanbanCard.css'; // Add CSS for styling
import { assets } from '../assets/assets';

const KanbanCard = ({ ticket, user }) => {
    // Function to get the user image based on the user's name
    const getUserImage = (name) => {
      switch (name.toLowerCase() ){
        case 'anoop sharma':
          return <img src={assets.Anoop_Sharma} />;
        case 'anurag':
          return <img src={assets.Anurag} />;
        case 'shankar kumar':
          return <img src={assets.Shankar_Kumar}  />;
        case 'ramesh':
          return <img src={assets.Ramesh} />;
        case 'suresh':
          return <img src={assets.Suresh}  />;
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
  