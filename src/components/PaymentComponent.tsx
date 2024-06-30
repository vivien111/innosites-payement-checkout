import React, { useState, ChangeEvent } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PaymentForm from './PaymentForm';
import MobileWalletForm from './MobileWalletForm';

const PaymentComponent: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [showCardModal, setShowCardModal] = useState<boolean>(false);
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false);

  const handleCardPayment = () => setShowCardModal(true);
  const handleWalletPayment = () => setShowWalletModal(true);
  const handleClose = () => {
    setShowCardModal(false);
    setShowWalletModal(false);
  };

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseFloat(event.target.value));
  };

  return (
    <div className="App">
      <h1>Choose Payment Method</h1>
      <div>
        <label>Enter Amount</label>
        <input type="number" value={amount} onChange={handleAmountChange} />
      </div>
      <div className="d-flex justify-content-around">
        <Button variant="primary" onClick={handleCardPayment}>
          <img src="/path/to/card-icon.png" alt="Card Payment" /> Card Payment
        </Button>
        <Button variant="secondary" onClick={handleWalletPayment}>
          <img src="./img/180px-Moov_Africa_logo.webp" alt="Mobile Wallet" style={{ height: '100px', width: '200px' }} />
        </Button>
        <Button variant="secondary" onClick={handleWalletPayment}>
          <img src="./img/mtn-logo-40644FC8B0-seeklogo.com.webp" alt="Mobile Wallet" style={{ height: '100px', width: '200px' }} />
        </Button>
      </div>

      <Modal show={showCardModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Card Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentForm amount={amount} />
        </Modal.Body>
      </Modal>

      <Modal show={showWalletModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mobile Wallet Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MobileWalletForm amount={amount} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentComponent;
