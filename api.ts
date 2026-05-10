export const BASE_URL = "https://learn.smktelkom-mlg.scj.id/toko/api";
export const IMAGE_URL = "https://learn.smktelkom-mlg.scj.id/toko/images/";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getUser() {
  if (typeof window === "undefined") return null;
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}

export function authHeaders() {
  return {
    Authorization: `Bearer ${getToken()}`,
  };
}