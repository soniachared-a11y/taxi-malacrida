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

  const { nom, telephone, depart, arrivee, date_heure, prix } = req.body

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

✅ Réservation confirmée
  `

  try {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "8582216343"

    if (!TELEGRAM_BOT_TOKEN) {
      console.error('Variables Telegram manquantes')
      return res.status(500).json({ error: 'Configuration serveur manquante' })
    }

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

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Erreur Telegram API:', errorText)
      return res.status(500).json({ error: 'Erreur notification' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Erreur Telegram:', error)
    return res.status(500).json({ error: 'Erreur notification' })
  }
}
