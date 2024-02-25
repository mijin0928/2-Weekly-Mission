import instance from "@/lib/axios";
import { useQuery } from '@tanstack/react-query';
interface Url {
  baseUrl: string;
  folderId: string | string[] | undefined | number;
}

export default function useAsync({ baseUrl, folderId }: Url) {
  const fetchUrl = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.get(
      `${baseUrl}${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };
  
  return useQuery({
    queryKey: [baseUrl, folderId],
    queryFn: async () => {
      const data = await fetchUrl();
      return data;
    }
  });
}
