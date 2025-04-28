import React from 'react';

const DeleteOrderConfirmation = ({ order, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl w-[90%] md:w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4 text-red-600">Confirm Deletion</h2>
                <p className="mb-6 text-gray-700">
                    Are you sure you want to delete order <strong>{order.id}</strong> placed by <strong>{order.customer}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onDelete(order.id)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrderConfirmation;
