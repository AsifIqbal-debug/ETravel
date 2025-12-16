export interface Holiday {
  id: string;
  title: string;
  destination: string;
  duration: string;
  price: number;
  currency: string;
  image: string;
  inclusions: string[];
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const listHolidays = async (dest?: string): Promise<Holiday[]> => {
  try {
    const params = new URLSearchParams();
    if (dest) params.append('dest', dest);
    
    const response = await fetch(`${API_URL}/holidays?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch holidays');
    return await response.json();
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return [];
  }
};
