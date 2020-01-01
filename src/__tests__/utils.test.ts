import { cleanup } from "@testing-library/react";

import { concatMap, getUserLanguage, saveSelectedLanguage } from "./../utils";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe("utils", () => {
  describe("getUserLanguage", () => {
    test("returns stored language", () => {
      localStorage.setItem("lang", "fr");
      expect(getUserLanguage()).toBe("fr");
    });

    test("returns default language if none is stored", () => {
      expect(getUserLanguage()).toBe("en");
    });
  });

  test("saveSelectedLanguage should store language", () => {
    saveSelectedLanguage("pt");
    expect(localStorage.getItem("lang")).toBe("pt");
  });

  test("concatMap should return a concatenation of two maps", () => {
    const map1: ReadonlyMap<string, string> = new Map([["map1", "map1item1"]]);
    const map2: ReadonlyMap<string, string> = new Map([["map2", "map2item1"]]);
    expect(concatMap(map1, map2).size).toEqual(2);
  });
});
