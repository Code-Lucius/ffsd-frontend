import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Edit({title, content, id}){
    const navigate = useNavigate();
    const { user } = useAuth(); 
    const [postData, setPostData] = useState({
        title: title,
        content: content,
        created_by: user.id,
      });
      
    const [errors, setErrors] = useState({});
    
        // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setPostData((prevData) => ({
        ...prevData,
        [id]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate title
        if (!postData.title.trim()) {
        newErrors.title = 'Title is required';
        } else if (postData.title.length < 5) {
        newErrors.title = 'Title must be at least 5 characters long';
        }

        // Validate content
        if (!postData.content.trim()) {
        newErrors.content = 'Content is required';
        } else if (postData.content.length < 20) {
        newErrors.content = 'Content must be at least 20 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}`},
                    credentials: 'include',
                    body: JSON.stringify(postData),
                });
      
                if (response.ok) {
                    alert('Post updated successfully.');
                    toggleEditForm(id);
                    navigate('/dashboard');

                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Error updating post');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };
    return (
        <>
            <div className="mt-5">
                <hr />
                <form onSubmit={handleSubmit} key={id} className="mt-8 px-4">
                    <div className="">
                        <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">
                        Post Title
                        </label>
                        <div className="mt-2">
                            <input
                            id="title"
                            value={postData.title}
                            onChange={handleChange}
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                    </div>

                    <div className="">
                        <label htmlFor="content" className="block text-sm/6 font-medium text-gray-900">
                        Post Content
                        </label>
                        <div className="mt-2">
                            <textarea 
                                value={postData.content}
                                onChange={handleChange}
                                rows="5" 
                                id="content" 
                                required 
                                className="block w-full text-sm/6 font-medium text-gray-900">                                
                            </textarea>
                        </div>
                        {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
                    </div>

                    <div className="mt-3">
                        <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Update
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}