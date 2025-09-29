export async function GetRequest(url: string): Promise<any | null> {
  /* Get the data from the API using a url
      Returns the response in json format 
      */
  const response = await fetch(url);
  if (!response.ok) {
    console.log(`Server responded with ${response.status}: ${response.statusText}`);
  }
  return await response.json(); // Parse the JSON response
}

export async function PostRequest(url: string, data: number[]): Promise<any | null> {
  // Call your FastAPI endpoint with the list of boulder IDs
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boulder_ids: data, top_N: 50 }),
  });

  if (!response.ok) {
    console.log(`Server responded with ${response.status}: ${response.statusText}`);
  }
  return await response.json(); // Parse the JSON response
}
