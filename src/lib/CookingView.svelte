<script>
import { onMount } from 'svelte'
import { locale } from '../stores/app.js';
import Button from '$lib/Button.svelte';

export let open = false;
export let recipe = null;

let currentStep = 0;
let listening = false;
let result = '';
let interimResult = '';
let commands = null;

let speech = null;
let synth = null;

$: {
    if (result && commands) {
        const lang = $locale.split('-')[0];

        if (wordsSaid(result, commands.nextStep[lang])) {
            nextStep();
        }

        if (wordsSaid(result, commands.previousStep[lang])) {
            previousStep();
        }

        if (wordsSaid(result, commands.firstStep[lang])) {
            firstStep();
        }

        if (wordsSaid(result, commands.lastStep[lang])) {
            lastStep();
        }

        if (wordsSaid(result, commands.ingredientsStep[lang])) {
            ingredientsStep();
        }

        if (wordsSaid(result, commands.readInstructions[lang])) {
            readInstructions();
        }

        if (wordsSaid(result, commands.readIngredients[lang])) {
            readIngredients();
        }

        if (wordsSaid(result, commands.close[lang])) {
            open = false;
        }
    }
}

$: {
    if (speech) {
        if (open) {
            currentStep = 0;
            speech.startRecognition();
        } else {
            speech.stopRecognition();
        }
    }
}

onMount(async () => {
    if ('webkitSpeechRecognition' in window) {
        const speechImport = await import('../stores/speech.js');
        speech = speechImport;
        commands = speech.commands;

        speech.listening.subscribe(value => {
            listening = value;
        });

        speech.result.subscribe(value => {
            result = value;
        });

        speech.interimResult.subscribe(value => {
            interimResult = value;
        });
    }

    if ('speechSynthesis' in window) {
        synth = window.speechSynthesis;
    }
});

function wordsSaid(said, words) {
    let hasSaidEveryWord = true;

    words.forEach(word => {
        if (!said.toLowerCase().includes(word)) {
            hasSaidEveryWord = false;
        }
    })

    return hasSaidEveryWord;
}

function close() {
    open = false;
}

function previousStep() {
    if (currentStep !== 0) {
        currentStep = currentStep - 1;
    }
}

function nextStep() {
    if (currentStep < recipe.steps.length) {
        currentStep = currentStep + 1;
    }
}

function ingredientsStep() {
    currentStep = 0;
}

function firstStep() {
    currentStep = 1;
}

function lastStep() {
    currentStep = recipe.steps.length;
}

function readInstructions() {
    if (currentStep > 0) {
        const voices = synth.getVoices();
        const utterThis = new SpeechSynthesisUtterance(recipe.steps[currentStep-1].text);

        for (let i = 0; i < voices.length; i++) {
            if (voices[i].lang === $locale) {
                utterThis.voice = voices[i];
                break;
            }
        }

        synth.speak(utterThis);
    }
}

function readIngredients() {
    const voices = synth.getVoices();
    let text = '';

    if (currentStep > 0) {
        recipe.steps[currentStep-1].ingredients
            .forEach(ingredient => {
                text += ingredient.join(' ');
                text += '.';
            });
    } else {
        recipe.steps
            .forEach(step => {
                if (step.ingredients) {
                    step.ingredients
                        .forEach(ingredient => {
                            text += ingredient.join(' ');
                            text += '.';
                        });
                }
            });
    }

    const utterThis = new SpeechSynthesisUtterance(text);

    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang === $locale) {
            utterThis.voice = voices[i];
            break;
        }
    }

    synth.speak(utterThis);
}

function toggleSpeech() {
    if (listening) {
        speech.stopRecognition();
    } else {
        speech.startRecognition();
    }
}
</script>

{#if recipe && open}
    <article class="cooking-view">
        <div class="header">
            <h1 class="title">{recipe.title}</h1>

            <div class="buttons">
                <!--
                <button class="button">
                    <svg width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <style>
                            .cls-1{fill:currentColor}
                            </style>
                        </defs>
                        <g data-name="Layer 34" id="Layer_34">
                            <path class="cls-1" d="M18 29a1 1 0 01-.57-.18l-10-7A1 1 0 017 21V11a1 1 0 01.43-.82l10-7a1 1 0 011-.07A1 1 0 0119 4v24a1 1 0 01-.54.89A1 1 0 0118 29zm-9-8.52l8 5.6V5.92l-8 5.6z"/>
                            <path class="cls-1" d="M8 22H4a3 3 0 01-3-3v-6a3 3 0 013-3h4a1 1 0 011 1v10a1 1 0 01-1 1zM4 12a1 1 0 00-1 1v6a1 1 0 001 1h3v-8zM18 21v-2a3 3 0 002.12-5.12l1.42-1.42A5 5 0 0118 21zM26.48 25.48a1 1 0 01-.71-.29 1 1 0 010-1.42 11 11 0 000-15.54 1 1 0 111.42-1.42 13 13 0 010 18.38 1 1 0 01-.71.29z"/>
                            <path class="cls-1" d="M23.65 22.65a1 1 0 01-.7-.29A1 1 0 0123 21a7 7 0 000-9.9 1 1 0 011.41-1.41 9 9 0 010 12.72 1 1 0 01-.76.24z"/>
                        </g>
                    </svg>
                </button>
                -->

                <div class="button-wrapper">
                    <button class="button" class:active="{listening}" on:click={toggleSpeech}>
                        <svg width="24px" height="24px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <style>
                                .cls-1{fill:currentColor}
                                </style>
                            </defs>
                            <g data-name="Layer 46" id="Layer_46">
                                <path class="cls-1" d="M16 27A10 10 0 016 17a1 1 0 012 0 8 8 0 0016 0 1 1 0 012 0 10 10 0 01-10 10z"/>
                                <path class="cls-1" d="M16 31a1 1 0 01-1-1v-4a1 1 0 012 0v4a1 1 0 01-1 1zM16 23a6 6 0 01-6-6V7a6 6 0 0112 0v10a6 6 0 01-6 6zm0-20a4 4 0 00-4 4v10a4 4 0 008 0V7a4 4 0 00-4-4z"/>
                            </g>
                        </svg>
                    </button>
                    <div class="interim">
                        {interimResult}
                    </div>
                </div>
            </div>

            <Button on:click={close}>x</Button>
        </div>

        <div class="steps">
            <div class:hidden="{currentStep !== 0}">
                <h2>Zutaten</h2>
                <div class="ingredients">
                    <ul>
                        {#each recipe.steps as step}
                            {#if step.ingredients}
                                <li>
                                    <b>{step.title}</b>
                                    <ul>
                                        {#each step.ingredients as ingredient}
                                            <li>
                                                {ingredient[0]}
                                                {ingredient[1]}
                                                {ingredient[2]}
                                            </li>
                                        {/each}
                                    </ul>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </div>
            </div>
            {#each recipe.steps as step, i}
                <div class:hidden="{currentStep !== i+1}">
                    <h2>{i+1}. {step.title}</h2>
                    <p>{step.text}</p>
                    {#if step.ingredients}
                        <ul>
                            {#each step.ingredients as ingredient}
                                <li>
                                    {ingredient[0]}
                                    {ingredient[1]}
                                    {ingredient[2]}
                                </li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}
        </div>

        <div class="footer">
            <div class:hidden="{currentStep === 0}">
                <Button on:click={previousStep}>&laquo;</Button>
            </div>
            <div class="footer__right" class:hidden="{currentStep === recipe.steps.length}">
                <Button on:click={nextStep}>&raquo;</Button>
            </div>
        </div>
    </article>
{/if}

<style>
.title {
    margin: 5px 0;
}

.cooking-view {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80vw;
    height: 80vh;
    border: 3px solid;
    border-color: var(--color-2);
    background-color: var(--color-bg);
    padding: 20px;
}

.steps {
    flex-grow: 1;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.footer {
    display: flex;
    justify-content: space-between;
}

.footer__right {
    margin-left: auto;
}

.hidden {
    display: none;
}

.buttons {
    display: flex;
}

.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    background: none;
    border: none;
    color: inherit;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    margin: 0 10px;
}

.button.active {
    animation: pulse-white 2s infinite;
}

.button-wrapper {
    position: relative;
}

.interim {
    position: absolute;
    width: 200px;
    transform: translateX(calc(-50% + 18px + 10px));
    text-align: center;
    top: 100%;
    font-size: 13px;
}

@keyframes pulse-white {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
