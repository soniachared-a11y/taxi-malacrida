export default async function handler(req, res) {
  // CORS headers
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

  const { depart, arrivee } = req.body

  if (!depart || !arrivee) {
    return res.status(400).json({ error: 'Départ et arrivée requis' })
  }

  try {
    const OPENROUTE_API_KEY = process.env.OPENROUTE_API_KEY

    if (!OPENROUTE_API_KEY) {
      console.error('OPENROUTE_API_KEY manquante')
      return res.status(500).json({ error: 'Configuration serveur manquante' })
    }

    // Geocode départ
    const geocodeDepart = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTE_API_KEY}&text=${encodeURIComponent(depart)}&boundary.country=FR`
    )
    
    if (!geocodeDepart.ok) {
      throw new Error('Erreur géocodage départ')
    }
    
    const dataDepart = await geocodeDepart.json()

    if (!dataDepart.features || dataDepart.features.length === 0) {
      return res.status(400).json({ error: 'Adresse de départ non trouvée' })
    }

    // Geocode arrivée
    const geocodeArrivee = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${OPENROUTE_API_KEY}&text=${encodeURIComponent(arrivee)}&boundary.country=FR`
    )
    
    if (!geocodeArrivee.ok) {
      throw new Error('Erreur géocodage arrivée')
    }
    
    const dataArrivee = await geocodeArrivee.json()

    if (!dataArrivee.features || dataArrivee.features.length === 0) {
      return res.status(400).json({ error: 'Adresse d\'arrivée non trouvée' })
    }

    // Calcul route
    const route = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car`,
      {
        method: 'POST',
        headers: { 
          'Authorization': OPENROUTE_API_KEY,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          coordinates: [
            [dataDepart.features[0].geometry.coordinates[0], dataDepart.features[0].geometry.coordinates[1]],
            [dataArrivee.features[0].geometry.coordinates[0], dataArrivee.features[0].geometry.coordinates[1]]
          ]
        })
      }
    )

    if (!route.ok) {
      throw new Error('Erreur calcul itinéraire')
    }

    const routeData = await route.json()
    
    if (!routeData.routes || routeData.routes.length === 0) {
      return res.status(400).json({ error: 'Itinéraire non trouvé' })
    }

    const distanceKm = parseFloat((routeData.routes[0].summary.distance / 1000).toFixed(2))
    const prixEuros = parseFloat((7 + (distanceKm * 2)).toFixed(2))
    
    // Extraire les coordonnées de la route pour l'affichage sur la carte
    const routeCoordinates = routeData.routes[0].geometry.coordinates.map((coord: number[]) => [coord[1], coord[0]] as [number, number])

    return res.status(200).json({
      distance_km: distanceKm,
      prix_euros: prixEuros,
      route_coordinates: routeCoordinates,
      depart_coords: [dataDepart.features[0].geometry.coordinates[1], dataDepart.features[0].geometry.coordinates[0]],
      arrivee_coords: [dataArrivee.features[0].geometry.coordinates[1], dataArrivee.features[0].geometry.coordinates[0]]
    })
  } catch (error) {
    console.error('Erreur calcul route:', error)
    return res.status(500).json({ error: 'Erreur calcul itinéraire' })
  }
}
