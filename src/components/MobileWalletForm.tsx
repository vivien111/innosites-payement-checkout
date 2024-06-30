import React, { useState, ChangeEvent, FormEvent } from 'react';

interface MobileWalletFormProps {
  amount: number;
}

const MobileWalletForm: React.FC<MobileWalletFormProps> = ({ amount }) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [walletProvider, setWalletProvider] = useState<string>(''); // You can have a dropdown or other input for selecting the provider

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic for processing mobile wallet payment
    console.log('Processing mobile wallet payment with:', phoneNumber, walletProvider, amount);
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleWalletProviderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWalletProvider(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Amount</label>
        <input type="text" value={amount} readOnly />
      </div>
      <div>
        <label>Phone Number</label>
        <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} required />
      </div>
      <div>
        <label>Wallet Provider</label>
        <input type="text" value={walletProvider} onChange={handleWalletProviderChange} required />
        {/* Alternatively, you can use a dropdown to select the provider */}
      </div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default MobileWalletForm;
