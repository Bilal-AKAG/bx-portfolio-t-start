export const getGithubData = async () => {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/Bilal-AKAG?y=last"
    );

    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch {
    return null;
  }
};
