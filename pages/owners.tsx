// pages/owners.tsx

import { useEffect, useState } from "react";
import { getOwners, addOwner } from "../services/apiService";
import styles from "../styles/Owners.module.css";
import { useRouter } from "next/router";

type Owner = {
  id: number;
  name: string;
  contactInfo: string;
};

export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [newOwner, setNewOwner] = useState<Omit<Owner, "id">>({
    name: "",
    contactInfo: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response: Owner[] = await getOwners();
        console.log("Fetched owners data:", response); // Log to check structure
        setOwners(response);
      } catch (error) {
        console.error("Error fetching owners:", error);
      }
    };
    fetchOwners();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOwner({ ...newOwner, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedOwner = await addOwner(newOwner);
      setOwners((prevOwners) => [...prevOwners, addedOwner]);
      setNewOwner({ name: "", contactInfo: "" });
      alert("Owner added successfully!");
    } catch (error) {
      console.error("Error adding owner:", error);
      alert("Failed to add owner. Please try again.");
    }
  };

  const handleOwnerClick = (ownerId: number) => {
    router.push(`/owners/${ownerId}`);
  };

  return (
    <div className={styles.container}>
      <h1>Manage Owners</h1>
      <div className={styles.ownersList}>
        {owners.length > 0 ? (
          owners.map((owner) => (
            <div
              key={owner.id}
              className={styles.card}
              onClick={() => handleOwnerClick(owner.id)}
            >
              <strong>{owner.name}</strong>
              <p>{owner.contactInfo}</p>
            </div>
          ))
        ) : (
          <div className={styles.card}>
            <p>No owners available</p>
          </div>
        )}
      </div>
      <div className={styles.card}>
        <h2>Add New Owner</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Owner Name"
            value={newOwner.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <input
            type="text"
            name="contactInfo"
            placeholder="Contact Info"
            value={newOwner.contactInfo}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
          <button type="submit" className={styles.button}>
            Add Owner
          </button>
        </form>
      </div>
    </div>
  );
}
