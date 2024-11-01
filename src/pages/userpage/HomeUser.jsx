import React, { useEffect, useState } from 'react';
import useCameraStore from '../../store/camera-store';
import { saveAddress } from '../../api/user-api';
import { toast } from 'react-toastify';

export default function HomeUser() {
  const users = useCameraStore((state) => state.user);
  const token = useCameraStore((state) => state.token);
  const setUser = useCameraStore((state) => state.setUser);

  const [newAddress, setNewAddress] = useState('');
  const [newName, setNewName] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(users);

  useEffect(() => {
    setUserName(users);
  }, [users]);

  const handleAddressUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await saveAddress(token, { address: newAddress });
      setUser({ ...users, address: newAddress });
      setIsEditingAddress(false);
      toast.success('Address updated successfully');
    } catch (error) {
      console.error('Error updating address:', error);
      toast.error('Failed to update address');
    }
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await saveAddress(token, { name: newName });
      setUser({ ...users, name: newName });
      setIsEditingName(false);
      toast.success('Name updated successfully');
    } catch (error) {
      console.error('Error updating name:', error);
      toast.error('Failed to update name');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black text-white shadow-md rounded-lg">
    <h2 className="text-3xl font-bold mb-6 text-yellow-400 border-b-2 border-yellow-400 pb-2">
      ข้อมูลผู้ใช้
    </h2>
  
    <table className="table-auto w-full text-white">
      <thead>
        <tr className="text-yellow-400">
          <th className="px-4 py-2 text-left">รายการ</th>
          <th className="px-4 py-2 text-left">รายละเอียด</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {/* Email */}
        <tr>
          <td className="px-4 py-2">Email</td>
          <td className="px-4 py-2">{userName?.email}</td>
        </tr>
  
        {/* Name */}
        <tr>
          <td className="px-4 py-2">Name</td>
          <td className="px-4 py-2">
            {!isEditingName ? (
              <>{userName?.name || 'ยังไม่ได้ระบุ'}</>
            ) : (
              <input
                type="text"
                className="input input-bordered bg-gray-700 text-white w-full p-2 rounded"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new name"
              />
            )}
          </td>
          <td className="px-4 py-2">
            {!isEditingName ? (
              <button
                className="btn bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
                onClick={() => setIsEditingName(true)}
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleNameUpdate}
                  className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingName(false)}
                  className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </td>
        </tr>
  
        {/* Address */}
        <tr>
          <td className="px-4 py-2">Address</td>
          <td className="px-4 py-2">
            {!isEditingAddress ? (
              <>{userName?.address || 'ยังไม่ได้ระบุ'}</>
            ) : (
              <input
                type="text"
                className="input input-bordered bg-gray-700 text-white w-full p-2 rounded"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                placeholder="Enter new address"
              />
            )}
          </td>
          <td className="px-4 py-2">
            {!isEditingAddress ? (
              <button
                className="btn bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded"
                onClick={() => setIsEditingAddress(true)}
              >
                Edit
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleAddressUpdate}
                  className="btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingAddress(false)}
                  className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            )}
          </td>
        </tr>
  
        {/* Role */}
        <tr>
          <td className="px-4 py-2">Role</td>
          <td className="px-4 py-2">{userName?.role}</td>
        </tr>
      </tbody>
    </table>
  </div>
  );
}
