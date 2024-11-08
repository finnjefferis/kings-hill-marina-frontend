import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getOwnerById, getBoats } from "../../services/apiService";
import styles from "../../styles/OwnerDetail.module.css";
import { Boat } from "../../types/Boat";
import { Owner } from "../../types/Owner";

export default function OwnerDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [owner, setOwner] = useState<Owner | null>(null);
  const [boats, setBoats] = useState<Boat[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchOwnerDetails = async () => {
      try {
        const ownerData = await getOwnerById(Number(id));
        setOwner(ownerData);

        const allBoats = await getBoats();
        const ownerBoats = allBoats.filter(
          (boat) => boat.ownerId === Number(id)
        );
        setBoats(ownerBoats);
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    };

    fetchOwnerDetails();
  }, [id]);

  if (!owner) {
    return <div>Loading owner details...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.ownerCard}>
        <h1>{owner.name}</h1>
        <p>Contact Info: {owner.contactInfo}</p>
      </div>

      <h2>Boats Owned:</h2>
      {boats.length > 0 ? (
        <div className={styles.boatsContainer}>
          {boats.map((boat) => (
            <div key={boat.id} className={styles.boatCard}>
              <strong>{boat.name}</strong> - {boat.make}
              <p>Length: {boat.length}m</p>
              <p>Type: {boat.type}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No boats owned by this owner.</p>
      )}
    </div>
  );
}
