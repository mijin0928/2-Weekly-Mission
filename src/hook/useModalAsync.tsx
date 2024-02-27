import instance from '@/lib/axios';
import { useState, ChangeEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface Values {
  name: string;
  url: string;
}

export default function useModalAsync(cardUrl?: string) {
  const router = useRouter();
  const { id } = router.query;
  const [values, setValues] = useState<Values>({
    name: '',
    url: '',
  });

  const queryClient = useQueryClient();

  async function postFolders() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.post(
      '/folders',
      { name: values.name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  async function postLinks() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.post(
      '/links',
      { url: values.url, folderId: 1 },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  async function putFolders() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.put(
      `/folders/${id}`,
      { name: values.name },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  async function deleteFolders() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(`/folders/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async function deleteLinks() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(`/links/${cardUrl}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  const { mutate: folderListAdd } = useMutation({
    mutationFn: postFolders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/folders']});
    },
  });

  const { mutate: folderAdd } = useMutation({
    mutationFn: postLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/links'] });
    },
  });

  const { mutate: edit } = useMutation({
    mutationFn: putFolders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/folders/${id}`] });
    },
  });

  const { mutate: folderRemove } = useMutation({
    mutationFn: deleteFolders,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/folders/${id}`] });
    },
  });

  const { mutate: linkRemove } = useMutation({
    mutationFn: deleteLinks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/folders/${cardUrl}`] });
    },
  });

  const handleValuesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    values,
    handleValuesChange,
    folderAdd,
    folderListAdd,
    edit,
    folderRemove,
    linkRemove,
  };
}
