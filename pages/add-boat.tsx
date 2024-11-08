import { useState, ChangeEvent, FormEvent } from "react";
import { addBoat } from "../services/apiService";
import { Boat } from "../types/Boat";

const AddBoatPage: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Boat, "id">>({
    name: "",
    length: 0,
    make: "",
    type: "",
    ownerId: 0,
    berthId: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addBoat(formData);
      alert("Boat added successfully!");
    } catch (error) {
      console.error("Error adding boat:", error);
      alert("Failed to add boat.");
    }
  };

  return (
    <div>
      <h1>Add New Boat</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} />

        <label>Length:</label>
        <input type="number" name="length" onChange={handleChange} />

        <label>Make:</label>
        <input type="text" name="make" onChange={handleChange} />

        <label>Type:</label>
        <input type="text" name="type" onChange={handleChange} />

        <label>Owner ID:</label>
        <input type="number" name="ownerId" onChange={handleChange} />

        <label>Berth ID (optional):</label>
        <input type="number" name="berthId" onChange={handleChange} />

        <button type="submit">Add Boat</button>
      </form>
    </div>
  );
};

export default AddBoatPage;
