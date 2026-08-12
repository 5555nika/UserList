import { useState } from 'react';
import type { IUser } from '../App';
import { AddUser } from './AddUser';

interface SingleUserProps {
  user: IUser;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, updatedUser: Omit<IUser, 'id'>) => void;
}

export const User = ({ user, onDelete, onEdit }: SingleUserProps) => {
  const [formEdit, setFormEdit] = useState(false);

  const toggleHappy = () => {
    onEdit?.(user.id, { ...user, isHappy: !user.isHappy });
  };

  return (
    <div className="user-card">
      <h3 className={user.isHappy ? 'text--done' : ''}>
        {user.name} {user.lastname}
      </h3>
      <p>Возраст: {user.age}</p>
      <p>О себе: {user.bio}</p>
      <p>
        Счастлив: <span className="happy-status">{user.isHappy ? 'Да' : 'Нет'}</span>
      </p>
      <div className="actions">
        <button className="btn__success" onClick={toggleHappy}>Toggle Happy</button>
        <button className="btn__danger" onClick={() => onDelete?.(user.id)}>Delete</button>
        {formEdit && (
          <AddUser
            user={user}
            onAdd={(updatedData) => {
              onEdit?.(user.id, updatedData);
              setFormEdit(false);
            }}
          />
        )}
      </div>
    </div>
  );
};