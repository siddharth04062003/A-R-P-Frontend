export async function fetchResources({ semester, subject, type }) {
  const query = new URLSearchParams();

  if (subject) query.append("subject", subject);
  if (type) query.append("type", type);

  const url = `http://localhost:600/api/resources/${semester}?${query.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch resources: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
