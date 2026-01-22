// Route calculation via secure serverless function
// ✅ SECURED: API key is now protected in serverless function

interface RouteResult {
  distance_km: number;
  prix_euros: number;
  route_coordinates?: [number, number][];
  depart_coords?: [number, number];
  arrivee_coords?: [number, number];
}

export const calculateRoute = async (
  departAddress: string,
  arriveeAddress: string
): Promise<RouteResult> => {
  try {
    // Call secure serverless function instead of direct API
    const response = await fetch('/api/calculate-route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        depart: departAddress,
        arrivee: arriveeAddress
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Erreur serveur' }));
      throw new Error(errorData.error || 'Erreur lors du calcul de l\'itinéraire');
    }

    const data = await response.json();
    
    return {
      distance_km: data.distance_km,
      prix_euros: data.prix_euros,
      route_coordinates: data.route_coordinates,
      depart_coords: data.depart_coords,
      arrivee_coords: data.arrivee_coords
    };
  } catch (error) {
    console.error('Erreur calcul itinéraire:', error);
    throw error;
  }
};
