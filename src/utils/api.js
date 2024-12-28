const API_KEY = import.meta.env.VITE_ACCESS_KEY;
const defaultParams = `client_id=${API_KEY}`;

export async function getImages(pageNumber) {
  try {
    const imageResponse = await fetch(`https://api.unsplash.com/photos?page=${pageNumber}&${defaultParams}&per_page=10`);

    if (!imageResponse.ok) {
      throw new Error("Fetch Error");
    }

    return await imageResponse.json();
  } catch (e) {
    throw new Error(e);
  }
}

export async function getSearchImages(pageNumber, searchWord) {
  try {
    const searchedImageResponse = await fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchWord}&${defaultParams}&per_page=10`);

    if (!searchedImageResponse.ok) {
      throw new Error("Fetch Error");
    }

    const searchedImageData = await searchedImageResponse.json();

    return searchedImageData.results;
  } catch (e) {
    throw new Error(e);
  }
}
