export const actions = {
  submit: async ({ cookies, request }) => {
    const data = await request.formData();
    console.log(data);
  }
};
