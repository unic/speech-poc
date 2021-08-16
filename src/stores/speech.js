import { writable } from 'svelte/store';
import { locale } from './app.js';

export const commands = {
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
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

export const recognition = new SpeechRecognition();

// doesn't work, chrome ends listening randomly so we have to start recognition in onend event again
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

locale.subscribe(currentLocale => {
    const lang = currentLocale.split('-')[0];

    // this defaults to the HTML lang attribute value
    // or the user agent's language setting if that isn't set either
    recognition.lang = currentLocale;

    const words = {};

    for (let key in commands) {
        if (commands.hasOwnProperty(key)) {
            commands[key][lang].forEach(word => words[word] = null);
        }
    }

    const grammar = '#JSGF V1.0; grammar commands; public <commands> = '
        + Object.keys(words).join(' | ') + ' ;'

    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammars = speechRecognitionList;
});


export const listening = writable(false);
export const confidence = writable(0);
export const error = writable(false);
export const result = writable('');
export const interimResult = writable('');

let localListening = false;
let localError = null;
let wakeLock = null;

async function reacquireWakeLock() {
    if (wakeLock !== null && document.visibilityState === 'visible') {
        wakeLock = await navigator.wakeLock.request('screen');
    }
}

export async function startRecognition() {
    if (localListening) {
        return;
    }

    recognition.start();

    localListening = true;
    listening.set(true);

    if ('wakeLock' in navigator && !wakeLock) {
        wakeLock = await navigator.wakeLock.request('screen');
        document.addEventListener('visibilitychange', reacquireWakeLock);
    }
}

export async function stopRecognition() {
    if (!localListening) {
        return;
    }

    // allow to stop
    localListening = false;
    listening.set(false);

    recognition.stop();

    if ('wakeLock' in navigator && wakeLock) {
        document.removeEventListener('visibilitychange', reacquireWakeLock);
        await wakeLock.release();
        wakeLock = null;
    }
}

recognition.onresult = function (event) {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            finalTranscript = event.results[i][0].transcript;
            confidence.set(event.results[i][0].confidence);
        } else {
            interimTranscript += event.results[i][0].transcript;
        }
    }

    interimResult.set(interimTranscript);
    result.set(finalTranscript);
}

recognition.onend = function () {
    // start recognition again when we still want to listen
    // and no important error (no-speech, network) occured
    if (
        localListening &&
        (
            localError === null ||
            ['no-speech', 'network'].includes(localError.error)
        )
    ) {
        recognition.start();
    } else {
        localListening = false;
        listening.set(false);
    }
};

recognition.onstart = function () {
    localError = null;
    error.set(null);
};

recognition.onerror = function(event) {
    localError = event;
    error.set(event);
}

// user agent has started to capture audio
recognition.onaudiostart = function () {
    console.log('audiostart')
}

recognition.onaudioend = function () {
    console.log('audioend')
}

// will run when any sound — recognisable speech or not — has been detected
recognition.onsoundstart = function () {
    console.log('soundstart')
}

recognition.onsoundend = function () {
    console.log('soundend')
}

// will run when sound recognized by the speech recognition service as speech has been detected
recognition.onspeechstart = function () {
    console.log('speechstart');
}

recognition.onspeechend = function () {
    console.log('speechend')
}