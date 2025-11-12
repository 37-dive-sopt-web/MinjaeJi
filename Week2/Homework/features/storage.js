const STORAGE_KEY = "membersData";

export function getMembersData() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function setMembersData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
