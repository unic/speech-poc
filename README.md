# Speech Cooking Mode PoC

Recipe demo page with speech API implementation to enable controlling the cooking mode with voice commands in four different languages.

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Before creating a production version of your app, install an [adapter](https://kit.svelte.dev/docs#adapters) for your target environment. Then:

```bash
npm run build
```

> You can preview the built app with `npm run preview`, regardless of whether you installed an adapter. This should _not_ be used to serve your app in production.

## Usage / Commands

Open cooking mode and say a sentence containing the words in the current set language:

```js
nextStep: {
    'de': ['nächster', 'schritt'],
    'en': ['next', 'step'],
    'fr': ['suivant', 'étape'],
    'it': ['prossimo', 'passo']
},
previousStep: {
    'de': ['vorheriger', 'schritt'],
    'en': ['previous', 'step'],
    'fr': ['précédent', 'étape'],
    'it': ['precedente', 'passo']
},
firstStep: {
    'de': ['erster', 'schritt'],
    'en': ['first', 'step'],
    'fr': ['première', 'étape'],
    'it': ['primo', 'passo']
},
lastStep: {
    'de': ['letzter', 'schritt'],
    'en': ['last', 'step'],
    'fr': ['dernière', 'étape'],
    'it': ['ultimo', 'passo']
},
ingredientsStep: {
    'de': ['zeige', 'zutaten'],
    'en': ['show', 'ingredients'],
    'fr': ['montrer', 'ingrédients'],
    'it': ['mostra', 'ingredienti']
},
readInstructions: {
    'de': ['lese', 'anweisungen'],
    'en': ['read', 'instructions'],
    'fr': ['lire', 'instructions'],
    'it': ['leggere', 'istruzioni']
},
readIngredients: {
    'de': ['lese', 'zutaten'],
    'en': ['read', 'ingredients'],
    'fr': ['lire', 'ingrédients'],
    'it': ['leggere', 'ingredienti']
},
close: {
    'de': ['schließen'],
    'en': ['close'],
    'fr': ['fermer'],
    'it': ['chiudere']
}
```
