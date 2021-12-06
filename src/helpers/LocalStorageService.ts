class LocalStorageService {
  public static setItem<T>(key: string, value: T): void {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  }

  public static getItem<T>(key: string): T | null {
    try {
      const value = window.localStorage.getItem(key) as string;
      return JSON.parse(value) as T;
    } catch (e) {
      return null;
    }
  }

  public static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }
}

export default LocalStorageService;
