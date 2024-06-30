import React, { useState, ChangeEvent, FormEvent } from 'react';
import { validateCardNumber, validateExpiryDate, validateCVC, processPayment } from '../utils/paymentUtils';

interface PaymentFormProps {
  amount: number;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!validateCardNumber(cardNumber)) {
      setErrorMessage('Invalid card number');
      return;
    }

    if (!validateExpiryDate(expiryDate)) {
      setErrorMessage('Invalid expiry date');
      return;
    }

    if (!validateCVC(cvc)) {
      setErrorMessage('Invalid CVC');
      return;
    }

    try {
      const paymentResponse = await processPayment({ cardNumber, expiryDate, cvc, amount });
      console.log('Payment successful:', paymentResponse);
      // Display success message or perform other actions here
    } catch (error) {
      setErrorMessage('Payment failed');
    }
  };

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(e.target.value);
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCvc(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input type="text" value={amount} readOnly />
      </div>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      <div>
        <label>Card Number</label>
        <input type="text" value={cardNumber} onChange={handleCardNumberChange} required />
      </div>
      <div>
        <label>Expiry Date (MM/YY)</label>
        <input type="text" value={expiryDate} onChange={handleExpiryDateChange} required />
      </div>
      <div>
        <label>CVC</label>
        <input type="text" value={cvc} onChange={handleCvcChange} required />
      </div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
