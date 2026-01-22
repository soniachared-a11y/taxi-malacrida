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
    console.log('[Client] Envoi notification Telegram - Données:', {
      nom: reservation.nom,
      telephone: reservation.telephone,
      depart: reservation.depart,
      arrivee: reservation.arrivee,
      date_heure: reservation.date_heure,
      prix: reservation.prix_euros,
      message: reservation.message
    });

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

    console.log('[Client] Réponse API - Status:', response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Erreur serveur - Impossible de parser la réponse' }));
      console.error('[Client] ERREUR Telegram - Status:', response.status);
      console.error('[Client] ERREUR Telegram - Détails:', errorData);
      throw new Error(errorData.error || `Erreur HTTP ${response.status}: ${response.statusText}`);
    }

    const successData = await response.json().catch(() => ({}));
    console.log('[Client] SUCCÈS Telegram:', successData);
    return true;
  } catch (error) {
    console.error('[Client] ERREUR EXCEPTION Telegram:', error);
    if (error instanceof Error) {
      console.error('[Client] Message d\'erreur:', error.message);
      console.error('[Client] Stack:', error.stack);
    }
    return false;
  }
};
