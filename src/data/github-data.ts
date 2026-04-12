export const getGithubData = async () => {
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/Bilal-AKAG?y=last"
    );

    if (!res.ok) {
      console.error("Failed to fetch contribution data:");
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching contribution data:", error);
    return null;
  }
};
