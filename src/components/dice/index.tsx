import "./dice-styles.css";

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export function randomDiceValue() {
  return (Math.floor(Math.random() * 6) + 1) as DiceValue;
}

const pointMap: Record<DiceValue, number[]> = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

type DiceProps = {
  value: DiceValue;
  rolling: boolean;
};

export function Dice({ value, rolling }: DiceProps) {
  return (
    <div className={`dice ${rolling ? "rolling" : ""}`}>
      <div className="dice-content">
        {[...Array(9)].map((_, i) => (
          <div key={i}>
            {pointMap[value].includes(i) && <div className="point" />}
          </div>
        ))}
      </div>
    </div>
  );
}
