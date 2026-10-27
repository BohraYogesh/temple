const base = import.meta.env.BASE_URL;

export const loadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = img.onerror = () => resolve();
    img.src = base + src;
  });

// list ko order me, ek saath max 3 images (bandwidth ek jagah na phase)
export async function preloadQueue(list, concurrency = 3) {
  const queue = [...new Set(list.filter(Boolean))];
  const worker = async () => {
    while (queue.length) await loadImage(queue.shift());
  };
  await Promise.all(Array.from({ length: concurrency }, worker));
}