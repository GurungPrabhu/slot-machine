/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from "react";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../elements/button";
import { changeBalance, logCurrentUser } from "../../../redux/action/game";

const Number = ({ number }) => (
  <div className="display-1 spinner-number bg-primary text-light py-5">
    {number}
  </div>
);

Number.propTypes = {
  number: PropTypes.number.isRequired,
};

const NumberSlots = ({ first, second, third }) => (
  <div className="row">
    <div className="col-4 text-center">
      <Number number={first} />
    </div>
    <div className="col-4 text-center">
      <Number number={second} />
    </div>
    <div className="col-4 text-center">
      <Number number={third} />
    </div>
  </div>
);

NumberSlots.propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  third: PropTypes.number.isRequired,
};

const Spinner = ({ onClose, open }) => {
  const [slotNumbers, setSlotNumbers] = useState({
    first: 0,
    second: 0,
    third: 0,
  });
  const auth = useSelector((store) => store.auth);
  const totalCurrency = useSelector((store) => store.game.currentData.balance);
  const dispatch = useDispatch();
  const getRandom = () => Math.floor(Math.random() * (10 - 1) + 1);

  const caculateGain = (num1, num2, num3) => {
    if (num1 === num2 && num1 === num3) {
      if (num1 === 7) return 10;
      return 5;
    }
    if (num1 === num2 || num2 === num3 || num1 === num3) return 0.5;
    return 0;
  };
  const logCurrent = () => {
    const currentDate = new Date();
    const data = {
      slots: {
        first: slotNumbers.first,
        second: slotNumbers.second,
        third: slotNumbers.third,
      },
      date: currentDate.getTime(),
    };

    if (auth.username.length > 0 && auth.loggedIn) {
      data.username = auth.username;
    } else {
      data.username = "guest";
    }

    dispatch(logCurrentUser(data));
  };

  const onClickTest = () => {
    setSlotNumbers({ first: 7, second: 7, third: 7 });
  };

  const onClickSpin = () => {
    setSlotNumbers({
      first: getRandom(),
      second: getRandom(),
      third: getRandom(),
    });
    const gain = caculateGain(
      slotNumbers.first,
      slotNumbers.second,
      slotNumbers.third
    );
    dispatch(changeBalance(gain - 1));
    logCurrent();
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      classNames={{ modal: "spinner-modal p-4 pt-5" }}
    >
      <div className="container">
        <div className="row">
          <div className="col h3" style={{ textAlign: "right" }}>
            <p>Amount: ${totalCurrency}</p>
          </div>
        </div>
        <NumberSlots
          first={slotNumbers.first}
          second={slotNumbers.second}
          third={slotNumbers.third}
        />
        <div className="row mt-3">
          <div className="col text-center">
            <Button
              onClick={onClickSpin}
              className="btn btn-danger btn-lg"
              text="Spin"
            />
          </div>
          <div className="col text-center">
            <Button
              onClick={onClickTest}
              className="btn btn-danger btn-lg"
              text="Test"
            />
          </div>
          <div className="col text-center">
            <Button
              onClick={onClose}
              className="btn btn-danger btn-lg"
              text="Close"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
Spinner.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default Spinner;
