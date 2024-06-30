// src/utils/paymentUtils.ts

// Fonction pour valider le numéro de carte de crédit (utilisant l'algorithme de Luhn)
export const validateCardNumber = (cardNumber: string): boolean => {
    const regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(cardNumber)) return false;

    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let intVal = parseInt(cardNumber.charAt(i), 10);
        if (i % 2 === 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) === 0;
};

// Fonction pour valider la date d'expiration
export const validateExpiryDate = (expiryDate: string): boolean => {
    if (!expiryDate) return false;

    const [month, year] = expiryDate.split('/');
    if (month.length !== 2 || year.length !== 2) return false;

    const currentDate = new Date();
    const inputDate = new Date(`20${year}-${month}-01`);

    return inputDate > currentDate && parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
};

// Fonction pour valider le CVC
export const validateCVC = (cvc: string): boolean => {
    const regex = new RegExp("^[0-9]{3,4}$");
    return regex.test(cvc);
};

// Définition des types pour les détails de la carte et la réponse de paiement
interface CardDetails {
    cardNumber: string;
    expiryDate: string;
    cvc: string;
    amount: number;
}

interface PaymentResponse {
    // Ajoutez ici les champs de la réponse de paiement selon l'API que vous utilisez
    success: boolean;
    transactionId: string;
}

// Fonction pour traiter le paiement (appel API fictif)
export const processPayment = async (cardDetails: CardDetails): Promise<PaymentResponse> => {
    const { cardNumber, expiryDate, cvc, amount } = cardDetails;

    // Exemple d'appel API fictif
    try {
        const response = await fetch('https://api.exemple.com/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cardNumber,
                expiryDate,
                cvc,
                amount
            })
        });

        if (!response.ok) {
            throw new Error('Payment failed');
        }

        const data: PaymentResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};
