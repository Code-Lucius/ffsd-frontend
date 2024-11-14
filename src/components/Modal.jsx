import React from 'react';

export default function DeleteModal({toggleDeleteModal, id}){
  const handleDelete = async (e) => {
    e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem('token')}` },
                credentials: 'include',
            });
  
            if (response.ok) {
                alert('Post Deleted successfully.');

                navigate('/dashboard');

            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error updating post');
            }
        } catch (error) {
            console.error('Error:', error);
        }
  };
    return(
        <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleDeleteModal} 
        ></div>

        {/* Modal Content */}
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Modal Title</h2>
            <p className="mt-4 text-gray-600">
              sure you want to delete post with id: {id}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => toggleDeleteModal(id)}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Close
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    )
}