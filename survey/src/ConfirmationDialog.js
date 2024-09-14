import React from 'react';

const ConfirmationDialog = ({ onConfirm, onCancel }) => (
  <div>
    <h2>Are you sure you want to submit the survey?</h2>
    <button onClick={onConfirm}>Yes</button>
    <button onClick={onCancel}>No</button>
  </div>
);

export default ConfirmationDialog;
