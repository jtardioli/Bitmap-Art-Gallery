export async function createDelay(milliseconds: number) {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
}
