# DESAFIO
***
## Configurações
### Firebase
- Ativar o método de autenticação E-mail/senha
- Criar banco de dados Firestore
- Adicionar regra ao Cloud Firestore:
    - allow read, write: if request.auth != null;

### Algoliasearch
- Criar projeto e índice na plataforma
- Definir, nas configurações, os atributos pesquisáveis:
`name`
`phone`
`birthDate`
`income`
`objectID`
`statusText`
`ownerId`

### App
- Criar arquivo .env na raiz do projeto
- Adicionar as chaves de configuração do firebase e algolia no arquivo .env
- Formato .env:
    - REACT_APP_FIREBASE_KEY=*****
    - REACT_APP_FIREBASE_DOMAIN=*****
    - REACT_APP_FIREBASE_PROJECT_ID=*****
    - REACT_APP_FIREBASE_STORAGE_BUCKET=*****
    - REACT_APP_FIREBASE_SENDER_ID=*****
    - REACT_APP_FIREBASE_APP_ID=*****
    - REACT_APP_FIREBASE_DATABASE=*****

    - REACT_APP_ALGOLIASEARCH_APPID=***
    - REACT_APP_ALGOLIASEARCH_APIKEY=***
    - REACT_APP_ALGOLIASEARCH_INDEX==***