// ✅ client/src/components/ActionButtons.jsx
import React from 'react';

export default function ActionButtons({ onView, onEdit, onDelete }) {
  return (
    <div className="action-buttons">
      <button onClick={onView}>View</button>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
