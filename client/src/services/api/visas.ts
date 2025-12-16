export interface Visa {
  id: string;
  country: string;
  type: string;
  processingTime: string;
  price: number;
  currency: string;
  image: string;
  requiredDocuments: string[];
}

const API_URL = 'http://localhost:5000/api';

export const listVisas = async (country?: string): Promise<Visa[]> => {
  try {
    const params = new URLSearchParams();
    if (country) params.append('country', country);
    
    const response = await fetch(`${API_URL}/visas?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch visas');
    return await response.json();
  } catch (error) {
    console.error('Error fetching visas:', error);
    return [];
  }
};
