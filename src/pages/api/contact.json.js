export  const post = async ({ request }) => {
  const data = await request.json();
  console.log(data);
  return {
    body: JSON.stringify({
      message: "This was a POST!"
    })
  }
}