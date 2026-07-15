import { useState } from 'react'
import './App.css'
import  { Users }  from './components/Users'
import  { Header }  from './components/Header'
import  { AddUser }  from './components/AddUser'

export interface IUser {
  id: number,
  name: string,
  lastname: string,
  age: number,
  bio: string,
  isHappy: boolean
}
export const App = () => {

  const [users, setUsers] = useState<IUser[]>([
    {id: 1, name: 'Kaan', lastname: 'Şişman', age: 43, bio: 'hello', isHappy: true}
  ])

  const add = (newUser: Omit<IUser, 'id'>) => {
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1
    setUsers(prev => ([...prev, { id, ...newUser}]))
  }
  
  const del = (id: number) => {
    setUsers(prev => prev.filter(i => i.id !== id))
  }
  
  const edit = (id: number, updatedUser: Omit<IUser, 'id'>) => {
    setUsers(users.map(user => 
      user.id === id ? { id, ...updatedUser } : user
    ))
  }


  return (
    <div className="app-container">
      <header>
        <Header title='Список пользователей' />
      </header>
      <div className="content-wrapper">
        <main>
          <Users users={users} onDelete={del} onEdit={edit} />
        </main>
        <aside>
          <AddUser onAdd={add}  />
        </aside>
      </div>
    </div>
  )
}
