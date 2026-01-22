# Configuration des Variables d'Environnement

## 🔒 Variables nécessaires pour la production (Vercel)

Pour que le site fonctionne correctement en production, vous devez configurer ces variables dans **Vercel Dashboard > Settings > Environment Variables** :

### Variables pour les Serverless Functions (Backend)

1. **OPENROUTE_API_KEY**
   - Clé API OpenRouteService pour le calcul d'itinéraires
   - Valeur : `5b3ce3597851110001cf6248d0f3e3e5bb7f4a7c9ed8f2d5c2e0e8e9`
   - ⚠️ **IMPORTANT** : Cette clé est maintenant protégée dans les serverless functions et n'est plus exposée dans le frontend

2. **TELEGRAM_BOT_TOKEN**
   - Token du bot Telegram pour les notifications
   - Valeur : `8530796120:AAEh9f52G1epKadFxY0mt5dxHHG-tNyZsw4`
   - ⚠️ **IMPORTANT** : Cette clé est maintenant protégée dans les serverless functions

3. **TELEGRAM_CHAT_ID**
   - ID du chat Telegram pour recevoir les notifications
   - Valeur : `[METTRE_ID_CLIENT_ICI]`

### Variables pour le Frontend (Build Time)

1. **VITE_SUPABASE_URL**
   - URL de votre projet Supabase
   - Valeur : `https://uqjftifudojfgfwfxxia.supabase.co`

2. **VITE_SUPABASE_ANON_KEY**
   - Clé anonyme Supabase (safe à exposer dans le frontend)
   - Valeur : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxamZ0aWZ1ZG9qZmdmd2Z4eGlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NTU4NjksImV4cCI6MjA1MjQzMTg2OX0.B7RGp_JIkLfvfXL6_F3U0PTGJU4WVjAV7_oQi0RkjN4`

## 📝 Comment configurer dans Vercel

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez chaque variable avec sa valeur
5. Sélectionnez les environnements (Production, Preview, Development)
6. Cliquez sur **Save**
7. Redéployez votre projet

## ✅ Sécurité

- ✅ Les clés API sensibles (OpenRoute, Telegram) sont maintenant protégées dans les serverless functions
- ✅ Elles ne sont plus exposées dans le code frontend
- ✅ Les serverless functions sont dans `/api/` et utilisent `process.env` pour accéder aux variables
- ✅ Le frontend appelle les serverless functions via `/api/calculate-route` et `/api/send-notification`

## 🚀 Après configuration

Une fois les variables configurées dans Vercel, redéployez votre projet. Les serverless functions pourront alors accéder aux clés API de manière sécurisée.
