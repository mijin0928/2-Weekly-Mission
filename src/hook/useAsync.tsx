function useAsync(
  baseUrl: string,
  folderId: string,
  path: string,
  userId: string
) {
  const fetchUrl = async () => {
    try {
      const response = await fetch(
        `https://bootcamp-api.codeit.kr/api${baseUrl}${folderId}${path}${userId}`
      );

      if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다');

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  };
  return [fetchUrl];
}

export default useAsync;
