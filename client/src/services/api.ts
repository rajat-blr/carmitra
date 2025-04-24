import axios from 'axios';

// Define base axios instance with common configuration
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define interfaces
export interface Guide {
  uuid: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  authorName: string;
  publishDate: string;
  readTime: number;
}

// Guide service
export const guideService = {
  getAllGuides: async (): Promise<Guide[]> => {
    try {
      const response = await api.get<Guide[]>('/guides');
      return response.data;
    } catch (error) {
      console.error('Error fetching guides:', error);
      throw error;
    }
  },
  
  getGuideById: async (uuid: string): Promise<Guide> => {
    try {
      const response = await api.get<Guide>(`/guides/${uuid}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching guide ${uuid}:`, error);
      throw error;
    }
  }
};

export default api; 