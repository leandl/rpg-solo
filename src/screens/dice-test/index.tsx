import { useCallback, useMemo, useState } from "react";
import { Dice, randomDiceValue, type DiceValue } from "../../components/dice";

import "./dice-test-styles.css";

function chanceOfAtLeastOneHit(diceCount: number, hitFaces: number): number {
  const missChance = (6 - hitFaces) / 6;
  return 1 - Math.pow(missChance, diceCount);
}

function hasAtLeastOneHit(dices: number[], hitFaces: number): boolean {
  const minSuccessValue = 7 - hitFaces;

  return dices.some((value) => value >= minSuccessValue);
}

export function DiceTest() {
  const [dices, setDices] = useState<DiceValue[]>([6, 6]);
  const [hitFaces, setHitFaces] = useState(2);

  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const successProbabity = useMemo(
    () => chanceOfAtLeastOneHit(dices.length, hitFaces) * 100,
    [dices.length, hitFaces],
  );

  const hasSuccess = hasAtLeastOneHit(dices, hitFaces);

  const rollDices = useCallback(() => {
    setRolling(true);
    setHasRolled(false);

    const interval = setInterval(() => {
      setDices((prev) => prev.map(randomDiceValue));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setDices((prev) => prev.map(randomDiceValue));
      setRolling(false);
      setHasRolled(true);
    }, 1000);
  }, []);

  const handleAddDice = useCallback(() => {
    setDices((prev) => (prev.length === 5 ? prev : [...prev, 6]));
  }, []);

  const handleRemoveDice = useCallback(() => {
    setDices((prev) => (prev.length === 1 ? prev : prev.slice(0, -1)));
  }, []);

  return (
    <div className="dice-test-container">
      <div className="dice-test-status">
        <h1>Teste de Dados</h1>

        <p>Dados: {dices.length}</p>
        <p>Faces de sucesso: {hitFaces}</p>

        <p className="probability">Chance: {successProbabity.toFixed(2)}%</p>

        {hasRolled && (
          <p className={hasSuccess ? "result-success" : "result-fail"}>
            {hasSuccess ? "Sucesso" : "Falha"}
          </p>
        )}

        {!hasRolled && <br />}
      </div>

      <div className="dice-test-row">
        {dices.map((v, i) => (
          <Dice key={i} value={v} rolling={rolling} />
        ))}
      </div>

      <div className="dice-controls">
        <button onClick={handleRemoveDice}>-</button>
        <button onClick={handleAddDice}>+</button>
      </div>

      <div className="slider-container">
        <label>Faces de sucesso: {hitFaces}</label>
        <input
          type="range"
          min={1}
          max={5}
          value={hitFaces}
          onChange={(e) => setHitFaces(Number(e.target.value))}
        />
      </div>

      <button className="roll-button" disabled={rolling} onClick={rollDices}>
        Rolar
      </button>
    </div>
  );
}
