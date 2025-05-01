import cloudinary from '$lib/server/cloudinary';

export const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    
    const uploadResult = await cloudinary.uploader.upload(
      `data:${file.type};base64,${base64}`,
      {
        folder: 'car-dealer',
        resource_type: 'image'
      }
    );

    return new Response(JSON.stringify({
      url: uploadResult.secure_url
    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};