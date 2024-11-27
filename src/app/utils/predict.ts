export const predict = async (data: FormData) => {
  try {
    const response = await fetch("/api/predict", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return (error as Error).message;
  }
};
