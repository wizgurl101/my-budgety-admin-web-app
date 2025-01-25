export const fetcher = async (url: string) => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    return await res.json();
  } catch (error) {
    // @ts-ignore
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};
