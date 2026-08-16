import { useState } from 'react';
import type { IUser } from '../App';
import { AddUser } from './AddUser';
import { IoTrash, IoPencil } from 'react-icons/io5'

interface SingleUserProps {
  user: IUser;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, updatedUser: Omit<IUser, 'id'>) => void;
}

export const User = ({ user, onDelete, onEdit }: SingleUserProps) => {

  const [formEdit, setFormEdit] = useState(false);

  return (
    <div className="user-card">
      <h3>{user.name} {user.lastname}</h3>
      <p>Возраст: {user.age}</p>
      <p>О себе: {user.bio}</p>
      <p>Счастлив: <span className="happy-status">{user.isHappy ? 'да' : 'нет'}</span></p>      
      <div className="actions">
        <button className="icon-edit" onClick={() => setFormEdit(!formEdit)}>
          <IoPencil />
        </button>
        <button className="icon-delete" onClick={() => onDelete?.(user.id)}>
          <IoTrash />
        </button>
        {formEdit && (
          <AddUser user={user} onAdd={(updatedData) => {
              onEdit?.(user.id, updatedData);
              setFormEdit(false);
            }}/>
        )}
      </div>
    </div>
  );
};