import Car from '$lib/server/models/cars';

export const GET = async () => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(cars), { status: 200 });
  } catch (err) {

    console.log(err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
};

export const POST = async ({ request }) => {
    try {
      const data = await request.json();
      const newCar = new Car({
        ...data,
        createdAt: new Date()
      });
      await newCar.save();
      return new Response(JSON.stringify(newCar), { status: 201 });
    } catch (error) {
      console.error('API Error:', error);
      return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
  };