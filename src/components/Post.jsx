import React, { useEffect, useState } from 'react';
import echo from '../echo';
import Edit from "./Edit";
import Modal from "./Modal";
import { useAuth } from '../context/AuthContext';

export default function Post(){
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);

    const [isEditFormOpen, setEditFormOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const toggleDeleteModal = (id) => {
        setDeleteModalOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
          }));
        };

    const toggleEditForm = (id) => {
    setEditFormOpen((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
 
        fetchPosts();

    }, []);

    useEffect(() => {
        
        echo.channel('posts')
            .listen('PostCreated', (event) => {
                setPosts((prevPosts) => [event, ...prevPosts]);
            });

        return () => {
            echo.leaveChannel('posts');
        };
    }, []);
 

    return (
        <>
            {posts.map((post) => (           
            <div className="mt-8 px-4 lg:px-40" key={post.user.id}>
                <div className="w-full lg:w-full p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {post.title}
                    </h2>

                    <p className="text-sm text-gray-500 mb-4">
                        By <span className="font-semibold">{post.user.first_name} {post.user.last_name}</span> · {new Date(post.created_at).toLocaleDateString('en-US', {year: 'numeric',month: 'short', day: 'numeric'})}
                    </p>

                    <p className="text-gray-600 text-base mb-4">
                        {post.content}
                    </p>

                    {user && post.user.id === user.id &&(<div className='text-end'>
                        <button onClick={() => toggleEditForm(post.id)}>Edit Post</button> <button className='ml-3' onClick={() => toggleDeleteModal(post.id)}>Delete Post</button>
                    </div>
                    )}

                    {/* POST EDIT FORM STARTS */}

                    {isEditFormOpen[post.id] && (<Edit  title={post.title} content={post.content} id={post.id}/>)}
                    {isDeleteModalOpen[post.id] && (<Modal toggleDeleteModal={toggleDeleteModal} id={post.id}/>)}
                </div>
            </div>
            ))}
                {/* POST EDIT FORM ENDS */}
            
        </>
    )
}