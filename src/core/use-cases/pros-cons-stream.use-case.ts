export const prosConsUseStreamCase = async (prompt: string) => {
  try {
    const resp = await fetch(
      `${import.meta.env.VITE_GPT_API}/pros-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
        // TODO: abortSignal
      }
    );

    if (!resp.ok) {
      throw new Error("No se pudo dar un punto de vista");
    }

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log("No se pudo generar reader");
      return null;
    }

    return reader;
  } catch (error) {
    return null;
  }
};
