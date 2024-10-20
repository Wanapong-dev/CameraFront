import React, { useEffect, useState } from 'react'
import useCameraStore from '../../store/camera-store'
import { toast } from "react-toastify";
import { changeUserStatus, listUsers, updateMember } from '../../api/user-api'; 

export default function ManageUser() {
  const [users, setUsers] = useState([]); 
  const token = useCameraStore((state) => state.token);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await listUsers(token);
      setUsers(resp.data); 
    } catch (err) {
      console.log(err);
    }
  };

  const hdlUpdateMember = async (e, id) => {
    const role = e.target.value; 
    try {
      const resp = await updateMember(token, id, { role }); 
      toast.success(resp.data); 
      getData(); 
    } catch (err) {
      console.log(err);
      toast.error("Failed to update role.");
    }
  };

  const hdlChangeStatus = async (id, enabled) => {
    try {
      const resp = await changeUserStatus(token, id, enabled);
      toast.success(resp.data); 
      getData()
    } catch (err) {
      console.log(err);
      toast.error('Failed to update status.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black shadow-lg rounded-lg">
    <h1 className="text-2xl font-bold mb-6 text-yellow-400">
      รายการผู้ใช้
    </h1>
  
    <table className="table-auto w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-800 text-yellow-400">
          <th className="border border-gray-700 p-4">No.</th>
          <th className="border border-gray-700 p-4">Email</th>
          <th className="border border-gray-700 p-4">Role</th>
          <th className="border border-gray-700 p-4">Actions</th>
          <th className="border border-gray-700 p-4">Disable</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, index) => (
          <tr key={item.id} className="hover:bg-yellow-800 text-white">
            <td className="border border-gray-700 p-4">{index + 1}</td>
            <td className="border border-gray-700 p-4">{item.email}</td>
  
            <td className="border border-gray-700 p-4">
              <select
                onChange={(e) => hdlUpdateMember(e, item.id)}
                value={item.role}
                className="bg-gray-800 text-white border border-gray-600 rounded px-2 py-1"
              >
                <option value="admin">ADMIN</option>
                <option value="user">USER</option>
              </select>
            </td>
  
            <td className="border border-gray-700 p-4">
                {item.enabled ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Inactive</span>
                )}
              </td>

              <td className="border border-gray-700 p-4">
                <button
                  onClick={() =>
                    hdlChangeStatus(item.id, !item.enabled) // ส่ง id และ สถานะใหม่ (ตรงข้ามกับสถานะปัจจุบัน)
                  }
                  className={`btn ${
                    item.enabled
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {item.enabled ? 'Disable' : 'Enable'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}