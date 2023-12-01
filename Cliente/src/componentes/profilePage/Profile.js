import React, { useState } from 'react';
import axios from 'axios';

export const ProfileForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('/profile', {
        name,
        role,
        currentPassword,
        newPassword,
      });
      setMessage('Perfil actualizado correctamente');
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Rol/Puesto:
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </label>
      <br />
      <label>
        Contraseña actual:
        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
      </label>
      <br />
      <label>
        Nueva contraseña:
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Guardar</button>
      {message && <div>{message}</div>}
    </form>
  );
};
