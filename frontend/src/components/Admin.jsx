import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";

export default function Admin() {
  const { token } = useContext(DataContext); // ดึง token จาก context
  const [data, setData] = useState([]); // ข้อมูลทั้งหมด
  const [formData, setFormData] = useState({
    legend_name: "",
    role: "",
    passive_ability: "",
    tactical_ability: "",
    ultimate_ability: "",
    health: "",
    shield: "",
    weapon_favorite: "",
    speed: "",
    home_world: "",
    lore: "",
    is_meta: false,
    release_year: "",
    pick_rate: "",
    ranked_win_rate: "",
    img: "",
  }); // ฟอร์มข้อมูล
  const [isEditing, setIsEditing] = useState(false); // สถานะแก้ไข
  const [editId, setEditId] = useState(null); // เก็บ id ที่ต้องการแก้ไข

  // Fetch ข้อมูลทั้งหมดจาก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/apex", {
          headers: {
            Authorization: `Bearer ${token}`, // ส่ง token ไปใน header
          },
        });
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);

//   console.log('data', token)
  // ฟังก์ชันสำหรับ handle การเพิ่มข้อมูลใหม่
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/apex", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ส่ง token ไปใน header
        },
        body: JSON.stringify(formData),
      });
      const newData = await response.json();
      setData([...data, newData.data]); // อัปเดตข้อมูลใหม่ใน state
      setFormData({
        legend_name: "",
        role: "",
        passive_ability: "",
        tactical_ability: "",
        ultimate_ability: "",
        health: "",
        shield: "",
        weapon_favorite: "",
        speed: "",
        home_world: "",
        lore: "",
        is_meta: false,
        release_year: "",
        pick_rate: "",
        ranked_win_rate: "",
        img: "",
      }); // เคลียร์ฟอร์ม
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  // ฟังก์ชันสำหรับ handle การแก้ไขข้อมูล
  const handleEdit = (id) => {
    const item = data.find((d) => d.id === id);
    setFormData({ ...item });
    setIsEditing(true);
    setEditId(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/apex/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ส่ง token ไปใน header
          },
          body: JSON.stringify(formData),
        }
      );
      const updatedData = await response.json();
      setData(data.map((d) => (d.id === editId ? updatedData : d)));
      setIsEditing(false);
      setFormData({
        legend_name: "",
        role: "",
        passive_ability: "",
        tactical_ability: "",
        ultimate_ability: "",
        health: "",
        shield: "",
        weapon_favorite: "",
        speed: "",
        home_world: "",
        lore: "",
        is_meta: false,
        release_year: "",
        pick_rate: "",
        ranked_win_rate: "",
        img: "",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // ฟังก์ชันสำหรับ handle การลบข้อมูล
  const handleDelete = async (id) => {
    window.confirm("Do you want delete it?");
    try {
      await fetch(`http://127.0.0.1:8000/api/apex/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // ส่ง token ไปใน header
        },
      });
      setData(data.filter((d) => d.id !== id)); // อัปเดต state หลังลบข้อมูล
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard || Token: {token}</h1>

      {/* ตารางแสดงข้อมูล */}
      <table className="w-full bg-gray-800 rounded-lg mb-6">
        <thead>
          <tr className="bg-gray-700 text-left">
            <th className="p-4">Legend Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Health</th>
            <th className="p-4">Shield</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t border-gray-600">
              <td className="p-4">{item.legend_name}</td>
              <td className="p-4">{item.role}</td>
              <td className="p-4">{item.health}</td>
              <td className="p-4">{item.shield}</td>
              <td className="p-4">
                <button
                  className="bg-yellow-500 text-gray-900 px-4 py-2 rounded mr-2"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ฟอร์มสำหรับเพิ่ม/แก้ไขข้อมูล */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Legend" : "Add New Legend"}
        </h2>
        <form onSubmit={isEditing ? handleUpdate : handleAdd}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Legend Name</label>
            <input
              type="text"
              value={formData.legend_name}
              onChange={(e) =>
                setFormData({ ...formData, legend_name: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">passive_ability</label>
            <input
              type="text"
              value={formData.passive_ability}
              onChange={(e) =>
                setFormData({ ...formData, passive_ability: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">tactical_ability</label>
            <input
              type="text"
              value={formData.tactical_ability}
              onChange={(e) =>
                setFormData({ ...formData, tactical_ability: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">ultimate_ability</label>
            <input
              type="text"
              value={formData.ultimate_ability}
              onChange={(e) =>
                setFormData({ ...formData, ultimate_ability: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">health</label>
            <input
              type="number"
              value={formData.health}
              onChange={(e) =>
                setFormData({ ...formData, health: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">shield</label>
            <input
              type="number"
              value={formData.shield}
              onChange={(e) =>
                setFormData({ ...formData, shield: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">weapon_favorite</label>
            <input
              type="text"
              value={formData.weapon_favorite}
              onChange={(e) =>
                setFormData({ ...formData, weapon_favorite: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">speed</label>
            <input
              type="number"
              value={formData.speed}
              onChange={(e) =>
                setFormData({ ...formData, speed: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">home_world</label>
            <input
              type="text"
              value={formData.home_world}
              onChange={(e) =>
                setFormData({ ...formData, home_world: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">lore</label>
            <input
              type="text"
              value={formData.lore}
              onChange={(e) =>
                setFormData({ ...formData, lore: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">is_meta</label>
            <input
              type="checkbox"
              checked={formData.is_meta} // ใช้ checked แทน value สำหรับ checkbox
              onChange={(e) =>
                setFormData({ ...formData, is_meta: e.target.checked })
              } // ใช้ e.target.checked เพื่อเก็บค่า boolean
              className=" p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">release_year</label>
            <input
              type="number"
              value={formData.release_year}
              onChange={(e) =>
                setFormData({ ...formData, release_year: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">pick_rate</label>
            <input
              type="number"
              value={formData.pick_rate}
              onChange={(e) =>
                setFormData({ ...formData, pick_rate: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">ranked_win_rate</label>
            <input
              type="number"
              value={formData.ranked_win_rate}
              onChange={(e) =>
                setFormData({ ...formData, ranked_win_rate: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">img</label>
            <input
              type="text"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
              className="w-full p-2 rounded bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 font-bold p-2 rounded hover:bg-yellow-600 transition duration-300"
          >
            {isEditing ? "Update Legend" : "Add Legend"}
          </button>
        </form>
      </div>
    </div>
  );
}
