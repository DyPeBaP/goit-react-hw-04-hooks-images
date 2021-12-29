const API_KEY = `23121176-a6e266cf1dd110f625e6378e3`;
const BASE_URL = 'https://pixabay.com/api/';


const fetchImages = async (searchItem, page) => {
  const rawResult = await fetch(
    `${BASE_URL}?q=${searchItem}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );

  if (!rawResult.ok) {
    throw rawResult;
  }

  const result = await rawResult.json();

  return result;
};

export default fetchImages;