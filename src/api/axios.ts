import { gamesMock } from '../mocks/gameMock'
import { settingsMock } from '../mocks/settingsMock'

export const SERVER_URL = ''

const apiClient = {
  get: async <T>(url: string): Promise<{ data: T }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));

    if (url === '/settings') {
      return { data: settingsMock as T };
    } else if (url === '/games') {
      return { data: gamesMock as T };
    } else if (url.startsWith('/games/')) {
      const slug = url.split('/').pop();
      const game = gamesMock.find(g => g.slug === slug);
      if (game) {
        return { data: game as T };
      }
      throw new Error('Game not found');
    }
    throw new Error('Not found');
  },
};

export default apiClient;