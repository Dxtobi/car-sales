import connectDB from '$lib/server/mongoose';

export const handle = async ({ event, resolve }) => {
  await connectDB();
  return resolve(event);
};