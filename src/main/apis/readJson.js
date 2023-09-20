export async function loadJson(fileName) {
  try {
    const module = await import(`../json/${fileName}.json`);
    return module.default;
  } catch (error) {
    console.error(`Error loading JSON file ${fileName}:`, error);
    return null;
  }
}
