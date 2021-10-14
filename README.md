# DESAFIO
***
## Configurações
### Firebase
- Ativar o método de autenticação E-mail/senha
- Criar banco de dados Firestore
- Adicionar regra ao Cloud Firestore: 
    - allow read, write: if request.auth != null;
### App
- Criar arquivo .env na raiz do projeto
- Adicionar as configurações do firebase no arquivo .env
- Formato .env:
    - REACT_APP_FIREBASE_KEY=*****
    - REACT_APP_FIREBASE_DOMAIN=*****
    - REACT_APP_FIREBASE_PROJECT_ID=*****
    - REACT_APP_FIREBASE_STORAGE_BUCKET=*****
    - REACT_APP_FIREBASE_SENDER_ID=*****
    - REACT_APP_FIREBASE_APP_ID=*****
    - REACT_APP_FIREBASE_DATABASE=*****