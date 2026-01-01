export const uploadImageToImgBB = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error('ImgBB API key is missing');
  }

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error?.message || 'Failed to upload image');
  }

  return data.data.url;
};
