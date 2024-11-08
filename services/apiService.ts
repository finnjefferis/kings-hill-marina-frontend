// services/apiService.ts

import { Boat } from "../types/Boat";
import { Berth } from "../types/Berth";
import { Owner } from "../types/Owner";

const API_BASE_URL = "http://localhost:5206/api"; // repalce with ENV in production

// Fetch all owners
// services/apiService.ts

export const getOwners = async (): Promise<Owner[]> => {
  const response = await fetch("http://localhost:5206/api/owners");
  if (!response.ok) {
    throw new Error("Failed to fetch owners");
  }
  const data = await response.json();

  return data.$values || data;
};
// Fetch a single owner by ID
export const getOwnerById = async (id: number): Promise<Owner> => {
  const response = await fetch(`${API_BASE_URL}/owners/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch owner");
  }
  return response.json();
};

// Add a new owner
export const addOwner = async (
  ownerData: Omit<Owner, "id">
): Promise<Owner> => {
  const response = await fetch(`${API_BASE_URL}/owners`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ownerData),
  });
  if (!response.ok) {
    throw new Error("Failed to add owner");
  }
  return response.json();
};

// Fetch all boats
export const getBoats = async (): Promise<Boat[]> => {
  const response = await fetch(`${API_BASE_URL}/boats`);
  if (!response.ok) {
    throw new Error("Failed to fetch boats");
  }

  const data = await response.json();

  const boats = data?.$values || []; // Default to an empty array to prevent error

  return boats;
};

// Add a new boat
export const addBoat = async (boatData: Omit<Boat, "id">): Promise<Boat> => {
  const response = await fetch(`${API_BASE_URL}/boats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(boatData),
  });
  if (!response.ok) {
    throw new Error("Failed to add boat");
  }
  return response.json();
};

// Calculate billing
export const calculateBilling = (length: number): number => {
  const ratePerMeter = 51.85;
  const monthsInYear = 12;
  const vatRate = 0.2;
  const annualCharge = length * ratePerMeter * monthsInYear;
  return annualCharge * (1 + vatRate);
};

const normalizeData = <T>(data: any): T[] => {
  return Array.isArray(data.$values) ? data.$values : data;
};

// Fetch all berths
export const getBerths = async (): Promise<Berth[]> => {
  const response = await fetch(`${API_BASE_URL}/berths`);
  if (!response.ok) {
    throw new Error("Failed to fetch berths");
  }
  const data = await response.json();
  return normalizeData(data);
};

export const getBerthById = async (id: number): Promise<Berth> => {
  const response = await fetch(`${API_BASE_URL}/berths/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch berth");
  }
  return response.json();
};

export const getBoatById = async (id: number): Promise<Boat> => {
  const response = await fetch(`${API_BASE_URL}/boats/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch boat");
  }
  return response.json();
};

// Add a new berth
export const addBerth = async (
  berthData: Omit<Berth, "id">
): Promise<Berth> => {
  const response = await fetch(`${API_BASE_URL}/berths`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(berthData),
  });
  if (!response.ok) {
    throw new Error("Failed to add berth");
  }
  return response.json();
};

// Assign a boat to a specific berth
export const assignBoatToBerth = async (
  berthId: number,
  boatId: number
): Promise<void> => {
  const response = await fetch(
    `${API_BASE_URL}/berths/${berthId}/assign-boat/${boatId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to assign boat to berth");
  }
};
