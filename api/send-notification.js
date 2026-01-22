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
    console.log('[Telegram API] ========== DÉBUT ENVOI ==========')
    console.log('[Telegram API] Méthode:', req.method)
    console.log('[Telegram API] Headers:', JSON.stringify(req.headers))
    console.log('[Telegram API] Body reçu:', JSON.stringify(req.body))
    console.log('[Telegram API] Données extraites:', { nom, telephone, depart, arrivee, date_heure, prix, message: clientMessage })
    
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8582216343"

    console.log('[Telegram API] Variables d\'environnement:')
    console.log('[Telegram API] - TELEGRAM_BOT_TOKEN présent:', !!TELEGRAM_BOT_TOKEN)
    console.log('[Telegram API] - TELEGRAM_BOT_TOKEN longueur:', TELEGRAM_BOT_TOKEN ? TELEGRAM_BOT_TOKEN.length : 0)
    console.log('[Telegram API] - TELEGRAM_CHAT_ID:', TELEGRAM_CHAT_ID)
    console.log('[Telegram API] - Toutes les variables env:', Object.keys(process.env).filter(k => k.includes('TELEGRAM')))

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('[Telegram] ERREUR: TELEGRAM_BOT_TOKEN manquant')
      return res.status(500).json({ error: 'Configuration serveur manquante: TELEGRAM_BOT_TOKEN' })
    }

    if (!TELEGRAM_CHAT_ID) {
      console.error('[Telegram] ERREUR: TELEGRAM_CHAT_ID manquant')
      return res.status(500).json({ error: 'Configuration serveur manquante: TELEGRAM_CHAT_ID' })
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    const requestBody = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    }
    
    console.log('[Telegram API] URL Telegram (masquée):', telegramUrl.replace(TELEGRAM_BOT_TOKEN, '***'))
    console.log('[Telegram API] Body de la requête:', JSON.stringify(requestBody))
    console.log('[Telegram API] Envoi de la requête à l\'API Telegram...')
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    })

    console.log('[Telegram API] Statut de la réponse:', response.status, response.statusText)
    console.log('[Telegram API] Headers de la réponse:', JSON.stringify(Object.fromEntries(response.headers.entries())))

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
    console.log('[Telegram API] SUCCÈS - Réponse complète:', JSON.stringify(responseData))
    console.log('[Telegram API] ========== FIN SUCCÈS ==========')
    return res.status(200).json({ success: true, telegramResponse: responseData })
  } catch (error) {
    console.error('[Telegram API] ========== ERREUR EXCEPTION ==========')
    console.error('[Telegram API] Type d\'erreur:', error.constructor.name)
    console.error('[Telegram API] Message:', error.message)
    console.error('[Telegram API] Stack:', error.stack)
    console.error('[Telegram API] Erreur complète:', JSON.stringify(error, Object.getOwnPropertyNames(error)))
    console.error('[Telegram API] ========== FIN ERREUR ==========')
    return res.status(500).json({ 
      error: 'Erreur notification',
      details: error.message,
      type: error.constructor.name
    })
  }
}
