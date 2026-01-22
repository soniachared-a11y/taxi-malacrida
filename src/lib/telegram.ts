// Telegram notification via secure serverless function
// ✅ SECURED: Bot token is now protected in serverless function

interface ReservationData {
  depart: string;
  arrivee: string;
  date_heure: string;
  nom: string;
  telephone: string;
  email: string;
  message?: string;
  distance_km: number;
  prix_euros: number;
}

export const sendTelegramNotification = async (reservation: ReservationData): Promise<boolean> => {
  try {
    // Call secure serverless function instead of direct API
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nom: reservation.nom,
        telephone: reservation.telephone,
        depart: reservation.depart,
        arrivee: reservation.arrivee,
        date_heure: reservation.date_heure,
        prix: `${reservation.prix_euros}€`,
        message: reservation.message || ''
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Erreur serveur' }));
      console.error('Erreur Telegram:', errorData.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur Telegram:', error);
    return false;
  }
};
