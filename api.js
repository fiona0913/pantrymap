(function () {
  const API = {};

  function normalizePantry(p) {
    return {
      id: String(p.id),
      name: p.name ?? "Untitled Pantry",
      status: p.status ?? "open",
      address: p.address ?? "",
      pantryType: p.pantryType ?? "shelf",
      acceptedFoodTypes: Array.isArray(p.acceptedFoodTypes) ? p.acceptedFoodTypes : [],
      hours: p.hours ?? {},
      photos: Array.isArray(p.photos) ? p.photos : [],
      location: {
        lat: Number(p.location?.lat ?? 0),
        lng: Number(p.location?.lng ?? 0),
      },
      inventory: p.inventory ?? { categories: [] },
      sensors: p.sensors ?? { weightKg: 0, lastDoorEvent: "", updatedAt: new Date().toISOString(), foodCondition: "" },
      contact: p.contact ?? { owner: "", phone: "", manager: "", volunteer: "" },
      latestActivity: p.latestActivity ?? null,
      stats: p.stats ?? { visitsPerDay: 0, visitsPerWeek: 0, donationAvgPerDayKg: 0, donationAvgPerWeekKg: 0, popularTimes: [] },
      wishlist: Array.isArray(p.wishlist) ? p.wishlist : [],
    };
  }

  // API base URL - change to your backend URL
  // TEMP: point to local backend port 5080 for end-to-end testing
  const API_BASE_URL = 'http://127.0.0.1:5080/api';

  API.getPantries = async function getPantries(filters = {}) {
    try {
      console.log('Fetching pantries from backend API...');
      
      // Build query string from filters
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      if (filters.bounds) params.append('bounds', filters.bounds);
      // Ensure we fetch enough pantries for the map (backend default is 100)
      params.append('page', String(filters.page ?? 1));
      params.append('pageSize', String(filters.pageSize ?? 500));
      
      const url = `${API_BASE_URL}/pantries${params.toString() ? '?' + params.toString() : ''}`;
      const res = await fetch(url, { cache: 'no-store' });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
    const list = await res.json();
    console.log('Raw data length:', list.length);
    const normalized = Array.isArray(list) ? list.map(normalizePantry) : [];
    console.log('Normalized data length:', normalized.length);
    return normalized;
    } catch (error) {
      console.error('Error fetching pantries:', error);
      // Fallback to static JSON if backend is unavailable
      console.log('Falling back to static pantries.json...');
      const res = await fetch('./pantries.json', { cache: 'no-store' });
      const list = await res.json();
      return Array.isArray(list) ? list.map(normalizePantry) : [];
    }
  };

  API.getPantry = async function getPantry(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/pantries/${id}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const pantry = await res.json();
      return normalizePantry(pantry);
    } catch (error) {
      console.error('Error fetching pantry:', error);
      throw error;
    }
  };

  API.getMessages = async function getMessages(pantryId) {
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${pantryId}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  API.postMessage = async function postMessage(pantryId, content, userName, userAvatar, photos = []) {
    try {
      const res = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pantryId, content, userName, userAvatar, photos })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return await res.json();
    } catch (error) {
      console.error('Error posting message:', error);
      throw error;
    }
  };

  // Donations

  API.getDonations = async function getDonations(pantryId, page = 1, pageSize = 5) {
    try {
      const res = await fetch(`${API_BASE_URL}/donations?pantryId=${encodeURIComponent(pantryId)}&page=${page}&pageSize=${pageSize}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.items || [];
    } catch (e) {
      console.error('Error fetching donations:', e);
      return [];
    }
  };

  // Wishlist
  API.getWishlist = async function getWishlist(pantryId) {
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist?pantryId=${encodeURIComponent(pantryId)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.items || [];
    } catch (e) {
      console.error('Error fetching wishlist:', e);
      return [];
    }
  };

  API.addWishlistItem = async function addWishlistItem(pantryId, item, quantity = 1) {
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pantryId, item, quantity })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.item || null;
    } catch (e) {
      console.error('Error adding wishlist item:', e);
      throw e;
    }
  };

  // Telemetry latest
  API.getTelemetryLatest = async function getTelemetryLatest(pantryId) {
    try {
      const res = await fetch(`${API_BASE_URL}/telemetry?pantryId=${encodeURIComponent(pantryId)}&latest=true`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.latest || null;
    } catch (e) {
      console.error('Error fetching telemetry latest:', e);
      return null;
    }
  };

  // Telemetry history
  API.getTelemetryHistory = async function getTelemetryHistory(pantryId, from, to) {
    try {
      let url = `${API_BASE_URL}/telemetry?pantryId=${encodeURIComponent(pantryId)}`;
      if (from) url += `&from=${encodeURIComponent(from)}`;
      if (to) url += `&to=${encodeURIComponent(to)}`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return data.items || [];
    } catch (e) {
      console.error('Error fetching telemetry history:', e);
      return [];
    }
  };

  function getStoredApiKey() {
    try {
      return localStorage.getItem('pantryApiKey') || '';
    } catch (e) {
      return '';
    }
  }

  function setStoredApiKey(value) {
    try {
      localStorage.setItem('pantryApiKey', value);
    } catch (e) {
      console.warn('Unable to persist API key', e);
    }
  }

  async function authorizedFetch(url, options = {}, retry = true) {
    const headers = new Headers(options.headers || {});
    const apiKey = getStoredApiKey();
    if (apiKey) headers.set('x-api-key', apiKey);
    const response = await fetch(url, { ...options, headers });
    if (response.status === 401 && retry) {
      const key = window.prompt('API key required to modify wishlist. Please enter API key:');
      if (key && key.trim()) {
        setStoredApiKey(key.trim());
        return authorizedFetch(url, options, false);
      }
    }
    return response;
  }

  // Wishlist
  API.getWishlist = async function getWishlist(pantryId) {
    if (!pantryId) return [];
    try {
      const res = await fetch(`${API_BASE_URL}/wishlist?pantryId=${encodeURIComponent(pantryId)}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) return data;
      return Array.isArray(data.items) ? data.items : [];
    } catch (e) {
      console.error('Error fetching wishlist:', e);
      return [];
    }
  };

  API.addWishlist = async function addWishlist(pantryId, item, quantity = 1) {
    if (!pantryId || !item) throw new Error('Missing pantryId or item');
    try {
      const res = await authorizedFetch(`${API_BASE_URL}/wishlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pantryId, item, quantity })
      });
      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.message || `HTTP error! status: ${res.status}`);
      }
      if (data.item) return data.item;
      if (data.items && data.items.length) return data.items[0];
      return data;
    } catch (e) {
      console.error('Error adding wishlist item:', e);
      throw e;
    }
  };

  // Expose globally
  window.PantryAPI = API;
})();


