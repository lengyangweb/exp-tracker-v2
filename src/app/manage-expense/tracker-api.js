/** Get all trackers */
export async function get() {
  const response = await fetch("/api/tracker");

  if (!response.ok) {
    throw new Error(`Unable to fetch trackers`);
  }

  return await response.json();
}

/**
 * @param {{ title: string }} newTracker
 * @returns {Promise<import("@/generated/prisma").Tracker>}
 */
export async function create(newTracker) {
  const response = await fetch("/api/tracker", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTracker),
  });

  if (!response.ok) {
    throw new Error("Unable to add new tracker.");
  }

  return await response.json();
}

/**
 * @param {string} id 
 * @param {import("../types/tracker").Tracker} updated 
 * @returns {Promise<boolean>}
 */
export async function update(id, updated) {
  const response = await fetch(`/api/tracker/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(updated)
  });

  if (!response.ok) throw new Error('Unable to update tracker.');

  return await response.json();
}

/**
 * @param {string} trackerId
 * @returns {Promise<boolean>}
 */
export async function remove(trackerId) {
  const response = await fetch(`/api/tracker/${trackerId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Unable to remove tracker.");
  }

  return await response.json();
}
