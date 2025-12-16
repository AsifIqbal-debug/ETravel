export interface Flight {
  id: string;
  airline: string;
  logo: string;
  origin: string;
  originCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  type: 'domestic' | 'international';
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const listFlights = async (from?: string): Promise<Flight[]> => {
  try {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    
    const response = await fetch(`${API_URL}/flights?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch flights');
    return await response.json();
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};
