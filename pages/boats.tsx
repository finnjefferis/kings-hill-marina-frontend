import { useEffect, useState } from "react";
import { getBoats, addBoat } from "../services/apiService";
import { Boat } from "../types/Boat";
import styles from "../styles/Boats.module.css";

export default function BoatsPage() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [newBoat, setNewBoat] = useState<Omit<Boat, "id">>({
    name: "",
    length: 0,
    make: "",
    type: "",
    ownerId: 0,
    berthId: null,
  });

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const data = await getBoats();
        setBoats(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching boats:", error);
      }
    };
    fetchBoats();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBoat({ ...newBoat, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedBoat = await addBoat(newBoat);
      setBoats((prevBoats) => [...prevBoats, addedBoat]);
      setNewBoat({
        name: "",
        length: 0,
        make: "",
        type: "",
        ownerId: 0,
        berthId: null,
      });
      alert("Boat added successfully!");
    } catch (error) {
      console.error("Error adding boat:", error);
      alert("Failed to add boat.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Manage Boats</h1>
      <div className={styles.boatsList}>
        {boats.length > 0 ? (
          boats.map((boat) => (
            <div key={boat.id} className={styles.card}>
              <strong>{boat.name}</strong>
              <p>Make: {boat.make}</p>
              <p>Length: {boat.length}m</p>
              <p>Type: {boat.type}</p>
              <p>Owner ID: {boat.ownerId}</p>
              {boat.berthId && <p>Berth ID: {boat.berthId}</p>}
            </div>
          ))
        ) : (
          <div className={styles.card}>
            <p>No boats available</p>
          </div>
        )}
      </div>
      <div className={styles.card}>
        <h2>Add New Boat</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newBoat.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />

          <label>Length:</label>
          <input
            type="number"
            name="length"
            value={newBoat.length}
            onChange={handleInputChange}
            className={styles.input}
            required
          />

          <label>Make:</label>
          <input
            type="text"
            name="make"
            value={newBoat.make}
            onChange={handleInputChange}
            className={styles.input}
            required
          />

          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={newBoat.type}
            onChange={handleInputChange}
            className={styles.input}
            required
          />

          <label>Owner ID:</label>
          <input
            type="number"
            name="ownerId"
            value={newBoat.ownerId}
            onChange={handleInputChange}
            className={styles.input}
            required
          />

          <label>Berth ID (optional):</label>
          <input
            type="number"
            name="berthId"
            value={newBoat.berthId || ""}
            onChange={handleInputChange}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            Add Boat
          </button>
        </form>
      </div>
    </div>
  );
}
