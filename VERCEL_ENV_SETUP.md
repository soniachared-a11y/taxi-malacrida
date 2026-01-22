# Configuration des Variables d'Environnement Vercel

## 🔒 Variables Requises dans Vercel Project Settings

Pour sécuriser les clés API, ajoutez ces variables dans **Vercel Dashboard > Project Settings > Environment Variables** :

### 1. Telegram Bot Configuration
```
TELEGRAM_BOT_TOKEN=8530796120:AAEh9f52G1epKadFxY0mt5dxHHG-tNyZsw4
TELEGRAM_CHAT_ID=[METTRE_ID_CLIENT_ICI]
```

### 2. OpenRouteService API
```
OPENROUTE_API_KEY=[VOTRE_CLE_OPENROUTE]
```

## 📍 Où Configurer

1. Allez sur [Vercel Dashboard](https://vercel.com/dashboard)
2. Sélectionnez votre projet
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez chaque variable pour **Production**, **Preview**, et **Development**

## ✅ Sécurité

- ✅ Les clés sont **UNIQUEMENT** accessibles côté serveur via `process.env`
- ✅ Aucune clé n'est exposée dans le bundle frontend
- ✅ Les fonctions serverless (`/api/*.js`) utilisent `process.env` pour accéder aux variables

## 🚨 Important

**NE JAMAIS** :
- ❌ Commiter les variables dans `.git`
- ❌ Utiliser `import.meta.env.VITE_*` pour les clés sensibles
- ❌ Exposer les tokens dans le code frontend

**TOUJOURS** :
- ✅ Utiliser `process.env` dans les fonctions serverless uniquement
- ✅ Ajouter les variables dans Vercel Dashboard
- ✅ Utiliser des valeurs différentes pour Production/Development si nécessaire
