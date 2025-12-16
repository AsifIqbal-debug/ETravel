export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  currency: string;
  image: string;
  amenities: string[];
}

const API_URL = 'http://localhost:5000/api';

export const listHotels = async (location?: string): Promise<Hotel[]> => {
  try {
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    
    const response = await fetch(`${API_URL}/hotels?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch hotels');
    return await response.json();
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
};
