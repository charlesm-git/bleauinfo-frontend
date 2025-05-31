export async function FetchData(url: string) {
    /* Get the data from the API using a url
    Returns the response in json format 
    */
    const response = await fetch(url);
    if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        return;
    }
    return await response.json(); // Parse the JSON response
}