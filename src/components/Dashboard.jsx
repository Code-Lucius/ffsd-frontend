import React, { useState } from 'react';
import Createpost from "./Createpost";
import Post from "./Post";

export default function Dashboard(){
    const [isPostFormOpen, setPostFormOpen] = useState(false);

    const togglePostForm = () => {
        setPostFormOpen(!isPostFormOpen);
      };

    return (
        <>
            <div className="min-h-full">
                <div className="flex justify-between mt-8 px-4 lg:px-40">
                    <h1 className="font-medium text-4xl">Dashboard</h1>
                    <button onClick={togglePostForm}>Create Post</button>
                </div>

                <div className="flex justify-between mt-8 px-4 lg:px-40">
                    <h1 className="font-medium text-2xl">Latest Posts</h1>
                </div>

                {/* ADDING NEW POST */}
                {isPostFormOpen && (< Createpost/>)}

                {/* ALL POSTS */}
                <Post />
          </div>
        </>
    )
}