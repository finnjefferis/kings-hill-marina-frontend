// pages/berths/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  getBerthById,
  getBoatById,
  getOwnerById,
} from "../../services/apiService";
import { calculateBilling } from "../../services/apiService";
import styles from "../../styles/BerthDetail.module.css";
import { Berth } from "../../types/Berth";
import { Boat } from "../../types/Boat";
import { Owner } from "../../types/Owner";

export default function BerthDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [berth, setBerth] = useState<Berth | null>(null);
  const [boat, setBoat] = useState<Boat | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [annualCost, setAnnualCost] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBerthDetails = async () => {
      try {
        const berthData = await getBerthById(Number(id));
        setBerth(berthData);

        if (berthData.boatId) {
          const boatData = await getBoatById(berthData.boatId);
          setBoat(boatData);
          setAnnualCost(calculateBilling(boatData.length)); // Calculate billing based on boat length

          if (boatData.ownerId) {
            const ownerData = await getOwnerById(boatData.ownerId);
            setOwner(ownerData);
          }
        }
      } catch (error) {
        console.error("Error fetching berth details:", error);
      }
    };

    fetchBerthDetails();
  }, [id]);

  if (!berth) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Berth {berth.id}</h1>
        <p>Location: {berth.location}</p>
        <p>Occupied by: {boat ? boat.name : "Empty"}</p>

        {boat && (
          <>
            <h2>Boat Details</h2>
            <p>Name: {boat.name}</p>
            <p>Make: {boat.make}</p>
            <p>Type: {boat.type}</p>
            <p>Length: {boat.length}m</p>
          </>
        )}

        {owner && (
          <>
            <h2>Owner Details</h2>
            <p>Name: {owner.name}</p>
            <p>Contact Info: {owner.contactInfo}</p>
          </>
        )}

        {annualCost !== null && (
          <>
            <h2>Annual Mooring Cost</h2>
            <p>£{annualCost.toFixed(2)}</p>
          </>
        )}
      </div>
    </div>
  );
}
