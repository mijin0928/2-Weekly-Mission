interface url {
  baseUrl: string;
  folderId: string | string[] | undefined | number;
}

export default function useAsync({ baseUrl, folderId }: url) {
  const fetchUrl = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const response = await fetch(
          `https://bootcamp-api.codeit.kr/api${baseUrl}${folderId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!response.ok) throw new Error('데이터를 불러오는데 실패했습니다');

        const result = await response.json();
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return [fetchUrl];
}
