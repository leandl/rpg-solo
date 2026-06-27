import { useCallback, useState } from "react";
import { Dice, randomDiceValue, type DiceValue } from "../../components/dice";

import sanityIcon from "../../assets/icons/sanity-icon.svg";

import "./sanity-test-styles.css";

function countHits(dices: number[], hitFaces: number): number {
  const minSuccessValue = 7 - hitFaces;

  return dices.filter((value) => value >= minSuccessValue).length;
}

export function SanityTest() {
  const [dices, setDices] = useState<DiceValue[]>([6, 6]);
  const [hitFaces, setHitFaces] = useState(2);
  const [sanityTestValue, setSanityTestValue] = useState(3);

  const [rolling, setRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);

  const successCount = countHits(dices, hitFaces);
  const sanityLoss = Math.max(0, sanityTestValue - successCount);
  const hasSuccess = sanityLoss === 0;

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
      <h1>Teste de Sanidade</h1>

      <div className="slider-container">
        <label>
          Sanidade: {sanityTestValue}
          <img
            src={sanityIcon}
            alt="Sanidade"
            style={{
              width: "1rem",
              height: "1rem",
              display: "inline-block",
              marginLeft: "0.2rem",
            }}
          />
        </label>
        <input
          type="range"
          min={1}
          max={10}
          value={sanityTestValue}
          onChange={(e) => setSanityTestValue(Number(e.target.value))}
        />
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

      <div className="dices-container">
        <p>Dados: {dices.length}</p>
        <div className="dice-test-row">
          {dices.map((v, i) => (
            <Dice key={i} value={v} rolling={rolling} />
          ))}
        </div>

        <div className="dice-controls">
          <button onClick={handleRemoveDice}>-</button>
          <button onClick={handleAddDice}>+</button>
        </div>
      </div>

      <div
        className={`result-container ${hasSuccess ? "result-success" : "result-fail"}`}
      >
        {hasRolled && (
          <>
            <p>Sucessos: {successCount}</p>

            {sanityLoss === 0 ? (
              <p>Você não perdeu sanidade.</p>
            ) : (
              <p>Perda de sanidade: {sanityLoss}</p>
            )}
          </>
        )}
      </div>

      <button className="roll-button" disabled={rolling} onClick={rollDices}>
        Rolar
      </button>
    </div>
  );
}
