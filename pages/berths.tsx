import { useEffect, useState } from "react";
import {
  getBerths,
  addBerth,
  assignBoatToBerth,
  getBoats,
} from "../services/apiService";
import { Berth } from "../types/Berth";
import { Boat } from "../types/Boat";
import styles from "../styles/Berths.module.css";
import Link from "next/link";

export default function BerthsPage() {
  const [berths, setBerths] = useState<Berth[]>([]);
  const [boats, setBoats] = useState<Boat[]>([]);
  const [newBerth, setNewBerth] = useState({ location: "" });
  const [boatId, setBoatId] = useState<number | null>(null);
  const [selectedBerthId, setSelectedBerthId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBerthsAndBoats = async () => {
      try {
        const berthsData = await getBerths();
        const boatsData = await getBoats();
        setBerths(berthsData);
        setBoats(boatsData);
      } catch (error) {
        console.error("Error fetching berths and boats:", error);
      }
    };
    fetchBerthsAndBoats();
  }, []);

  const handleBerthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBerth({ ...newBerth, [name]: value });
  };

  const handleAddBerth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedBerth = await addBerth(newBerth);
      setBerths([...berths, addedBerth]);
      setNewBerth({ location: "" });
    } catch (error) {
      console.error("Error adding berth:", error);
    }
  };

  const handleAssignBoat = async () => {
    if (selectedBerthId && boatId) {
      try {
        await assignBoatToBerth(selectedBerthId, boatId);
        const updatedBerths = berths.map((berth) =>
          berth.id === selectedBerthId ? { ...berth, boatId } : berth
        );
        setBerths(updatedBerths);
        setSelectedBerthId(null);
        setBoatId(null);
      } catch (error) {
        console.error("Error assigning boat:", error);
      }
    }
  };

  const getBoatName = (boatId: number | null | undefined) => {
    const boat = boats.find((boat) => boat.id === boatId);
    return boat ? boat.name : "Empty";
  };

  return (
    <div className={styles.container}>
      <h1>Berths Management</h1>

      <div className={styles.berthList}>
        {berths.length > 0 ? (
          berths.map((berth) => (
            <Link key={berth.id} href={`/berths/${berth.id}`}>
              <div className={styles.berthCard}>
                <h2>Berth {berth.id}</h2>
                <p>Location: {berth.location}</p>
                <p>Occupied by: {getBoatName(berth.boatId)}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No berths available</p>
        )}
      </div>

      <div className={styles.formCard}>
        <h2>Add New Berth</h2>
        <form onSubmit={handleAddBerth} className={styles.form}>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newBerth.location}
            onChange={handleBerthChange}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Add Berth
          </button>
        </form>
      </div>

      <div className={styles.formCard}>
        <h2>Assign Boat to Berth</h2>
        <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
          <input
            type="number"
            placeholder="Boat ID"
            value={boatId || ""}
            onChange={(e) => setBoatId(Number(e.target.value))}
            required
            className={styles.input}
          />
          <select
            value={selectedBerthId || ""}
            onChange={(e) => setSelectedBerthId(Number(e.target.value))}
            className={styles.input}
          >
            <option value="">Select Berth</option>
            {berths
              .filter((berth) => !berth.boatId) // Only show unoccupied berths
              .map((berth) => (
                <option key={berth.id} value={berth.id}>
                  Berth {berth.id} - {berth.location}
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={handleAssignBoat}
            className={styles.button}
          >
            Assign Boat
          </button>
        </form>
      </div>
    </div>
  );
}
