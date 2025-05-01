
export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };