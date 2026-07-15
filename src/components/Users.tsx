import type { IUser } from '../App'
import { User } from '../components/User'

export interface UserProps {
    users: IUser[]
    onDelete?: (id: number) => void
    onEdit?: (id: number, updatedUser: Omit<IUser, 'id'>) => void
}
export const Users = ({ users, onDelete, onEdit }: UserProps ) => {


    return (
        <div className="users-list">

        {users.length === 0 && <h2 className="user-empty">Список пользователей пуст</h2>}

            {users.map(user => 
                <User key={user.id} user={user} onDelete={onDelete} onEdit={onEdit} />
            )}
        </div>
    )
}