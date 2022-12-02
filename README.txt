

windows powershell:
npm install
npm test
$env:NODE_OPTIONS = "--openssl-legacy-provider"
npm run dev

windows command prompt:
npm install 
npm test
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev

mac/linux:
npm install 
npm test
export NODE_OPTIONS=--openssl-legacy-provider
npm run dev
