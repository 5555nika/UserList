import { useState } from "react"
import type { IUser } from "../App"

export interface IAdduserProps{
    onAdd: (user: Omit<IUser, 'id'>) => void;
    user?: IUser;
}

export const AddUser = ({ onAdd, user }: IAdduserProps ) => {

    const [formData, setFormData] = useState(user || {
        name: '', 
        lastname: '', 
        age: '', 
        bio: '', 
        isHappy: false
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        onAdd({
            ...formData,
            age: Number(formData.age) 
        })
        if ( !user ) {
            setFormData({
                name: '', 
                lastname: '', 
                age: '', 
                bio: '', 
                isHappy: false
            })
        }
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked, value, type} = e.target;
        setFormData(prev => ({...prev, [name]: type === 'checkbox'? checked  : value}))
    }

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <input type="text"
            placeholder="Enter your name"
            name='name'
            value={formData.name}
            onChange={handleChange}   />

            <input type="text"
            placeholder="Enter your lastname"
            name='lastname'
            value={formData.lastname}
            onChange={handleChange}   />

            <input type="number"
            placeholder="Enter your age"
            name='age'
            value={formData.age}
            onChange={handleChange}   />

            <input type="text"
            placeholder="Enter your bio"
            name='bio'
            value={formData.bio}
            onChange={handleChange}   />

            <label>
            <input type="checkbox"
            name='isHappy'
            checked={formData.isHappy}
            onChange={handleChange}  />
            Are you sure ?
            </label>
            <button type="submit">{user? 'Edit' : 'Add'}</button>
            
        </form>
    )
}