export function shuffle(array, rng = Math.random) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildDeck(level = 1) {
  // 각 레벨별 행(row)과 열(col)
  const LEVEL_TO_GRID = {
    1: [4, 4], // 4x4 -> 16장 (8쌍)
    2: [4, 6], // 4x6 -> 24장 (12쌍)
    3: [6, 6], // 6x6 -> 36장 (18쌍)
  };

  const [rows, cols] = LEVEL_TO_GRID[level] ?? [4, 4];
  const total = rows * cols;

  if (total % 2 !== 0) throw new Error("카드 개수는 짝수여야 해요.");

  const pairCount = total / 2;

  const baseValues = Array.from({ length: pairCount }, (_, i) => i + 1);

  // 각 숫자값을 2장씩 생성하고 고유 id 부여
  const duplicated = baseValues.flatMap((value) => [
    { id: `${value}-a`, value },
    { id: `${value}-b`, value },
  ]);

  // 매번 다른 순서로 섞기
  return shuffle(duplicated);
}
