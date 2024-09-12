export const deleteSecret = async (url: string): Promise<Response> => {
  return await fetch(url, {
    method: 'DELETE',
  });
};
