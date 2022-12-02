

windows powershell:
npm install
$env:NODE_OPTIONS = "--openssl-legacy-provider"
npm run dev

windows command prompt:
npm install 
set NODE_OPTIONS=--openssl-legacy-provider
npm run dev

mac/linux:
npm install 
export NODE_OPTIONS=--openssl-legacy-provider
npm run dev
