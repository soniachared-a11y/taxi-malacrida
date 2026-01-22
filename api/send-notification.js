export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { nom, telephone, depart, arrivee, date_heure, prix, message: clientMessage } = req.body

  if (!nom || !telephone || !depart || !arrivee || !date_heure || !prix) {
    return res.status(400).json({ error: 'Données manquantes' })
  }

  const message = `
🚗 NOUVELLE RÉSERVATION TAXI MALACRIDA

👤 Client : ${nom}
📞 Tél : ${telephone}

📍 Départ : ${depart}
📍 Arrivée : ${arrivee}
🕐 Date/Heure : ${date_heure}

💰 Prix estimé : ${prix}€
${clientMessage ? `\n💬 Message : ${clientMessage}` : ''}

✅ Réservation confirmée
  `

  try {
    console.log('[Telegram] Début de l\'envoi de notification')
    console.log('[Telegram] Données reçues:', { nom, telephone, depart, arrivee, date_heure, prix, message: clientMessage })
    
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8582216343"

    console.log('[Telegram] TELEGRAM_BOT_TOKEN présent:', !!TELEGRAM_BOT_TOKEN)
    console.log('[Telegram] TELEGRAM_CHAT_ID:', TELEGRAM_CHAT_ID)

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('[Telegram] ERREUR: TELEGRAM_BOT_TOKEN manquant')
      return res.status(500).json({ error: 'Configuration serveur manquante: TELEGRAM_BOT_TOKEN' })
    }

    if (!TELEGRAM_CHAT_ID) {
      console.error('[Telegram] ERREUR: TELEGRAM_CHAT_ID manquant')
      return res.status(500).json({ error: 'Configuration serveur manquante: TELEGRAM_CHAT_ID' })
    }

    console.log('[Telegram] Envoi de la requête à l\'API Telegram...')
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message
        })
      }
    )

    console.log('[Telegram] Statut de la réponse:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Telegram] ERREUR API:', response.status, errorText)
      return res.status(500).json({ 
        error: 'Erreur notification Telegram',
        details: errorText,
        status: response.status
      })
    }

    const responseData = await response.json()
    console.log('[Telegram] SUCCÈS:', responseData)
    return res.status(200).json({ success: true, telegramResponse: responseData })
  } catch (error) {
    console.error('[Telegram] ERREUR EXCEPTION:', error.message)
    console.error('[Telegram] Stack:', error.stack)
    return res.status(500).json({ 
      error: 'Erreur notification',
      details: error.message
    })
  }
}
