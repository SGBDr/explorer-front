# Étape 1 : Utiliser une image de Node.js comme base
FROM node:14 as builder

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers de package.json et package-lock.json (ou yarn.lock)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le contenu de l'application dans le conteneur
COPY . .

# Construire l'application en mode de production
RUN npm run build --prod

# Étape 2 : Utiliser une image légère et optimisée pour exécuter l'application
FROM nginx:alpine

# Copier le résultat de la construction de l'étape précédente vers le répertoire d'hébergement de Nginx
COPY --from=build-stage /usr/src/app/dist/explorer-front /usr/share/nginx/html

# Nginx écoute le port 80 par défaut, pas besoin de spécifier EXPOSE.

# CMD par défaut de l'image nginx : "CMD ["nginx", "-g", "daemon off;"]"
# Cela signifie que Nginx sera démarré automatiquement lorsqu'un conteneur sera lancé.

# Vous n'avez pas besoin de spécifier CMD car la commande par défaut de Nginx suffit pour servir l'application Angular.

