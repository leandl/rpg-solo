import { useCallback, useState } from "react";
import { Dice, randomDiceValue, type DiceValue } from "../../components/dice";

import "./battle-styles.css";

export function Battle() {
  const [myDices, setMyDices] = useState<DiceValue[]>([6, 6]);
  const [opponentDices, setOpponentDices] = useState<DiceValue[]>([6, 6]);

  const [rolling, setRolling] = useState(false);

  const rollDices = useCallback(() => {
    setRolling(true);

    let interval = setInterval(() => {
      setMyDices((prev) => prev.map(randomDiceValue));
      setOpponentDices((prev) => prev.map(randomDiceValue));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);

      setMyDices((prev) => prev.map(randomDiceValue));
      setOpponentDices((prev) => prev.map(randomDiceValue));

      setRolling(false);
    }, 1000);
  }, []);

  const handleAddMyDice = useCallback(() => {
    setMyDices((prev) => (prev.length === 5 ? prev : [...prev, 6]));
  }, []);

  const handleAddOpponentDice = useCallback(() => {
    setOpponentDices((prev) => (prev.length === 5 ? prev : [...prev, 6]));
  }, []);

  const handleRemoveMyDice = useCallback(() => {
    setMyDices((prev) => (prev.length === 1 ? prev : prev.slice(0, -1)));
  }, []);

  const handleRemoveOpponentDice = useCallback(() => {
    setOpponentDices((prev) => (prev.length === 1 ? prev : prev.slice(0, -1)));
  }, []);

  return (
    <div className="battle-container">
      {/* PLAYER */}
      <div className="player-area">
        <div className="status-box">
          <p>Você</p>
        </div>
        <div className="dice-row player">
          {myDices.map((v, i) => (
            <Dice key={i} value={v} rolling={rolling} />
          ))}
        </div>

        <div className="controls">
          <button disabled={myDices.length === 1} onClick={handleRemoveMyDice}>
            -
          </button>
          <button disabled={myDices.length === 5} onClick={handleAddMyDice}>
            +
          </button>
        </div>
      </div>

      {/* CAMPO */}
      <div className="battle-field">
        <button className="primary" disabled={rolling} onClick={rollDices}>
          Rolar
        </button>
      </div>

      {/* OPONENTE */}
      <div className="enemy-area">
        <div className="status-box">
          <p>Oponente</p>
          <div className="hp-bar"></div>
        </div>

        <div className="dice-row enemy">
          {opponentDices.map((v, i) => (
            <Dice key={i} value={v} rolling={rolling} />
          ))}
        </div>

        <div className="controls">
          <button
            disabled={opponentDices.length === 1}
            onClick={handleRemoveOpponentDice}
          >
            -
          </button>
          <button
            disabled={opponentDices.length === 5}
            onClick={handleAddOpponentDice}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
