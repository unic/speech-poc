<script>
import { locale } from '../stores/app.js';
import Button from '$lib/Button.svelte';
import CookingView from '$lib/CookingView.svelte';

let cookingModeOpen = false;

const recipes = {
    "de": {
        "title": "Apfelhälften mit Hackfleischfüllung",
        "steps": [
            {
                "title": "Äpfel",
                "text": "Äpfel bis auf einen ca. 1 cm breiten Rand aushöhlen. Fruchtfleisch grob hacken, beiseite stellen. Äpfel in die vorbereitete Form stellen. Hackfleisch und alle Zutaten bis und mit Paprika in einer Schüssel mischen, von Hand gut kneten, bis sich die Zutaten zu einer kompakten Masse verbinden. Mit nassen Händen 8 gleich grosse Kugeln formen. Äpfel damit füllen. Bratspeck um die Äpfel wickeln.",
                "ingredients": [
                    [4, "", "Äpfel, quer halbiert, Kerngehäuse entfernt"],
                    [400, "g", "Hackfleisch (Rind)"],
                    [1, "EL", "Petersilie, fein geschnitten"],
                    [1, "", "Zwiebel, fein gehackt"],
                ]
            },
            {
                "title": "Preiselbeer-Apfel-Sauce",
                "text": "Apfelfruchtfleisch mit den Preiselbeeren pürieren. Thymian beigeben.",
                "ingredients": [
                    [100, "", "Preiselbeeren aus dem Glas"],
                    [0.5, "TL", "Thymianblättchen"],
                ]
            },
            {
                "title": "Backen",
                "text": "Ca. 15 Min. in der Mitte des auf 220 °C vorgeheizten Ofens. Herausnehmen, Preiselbeer-Apfel-Sauce darauf verteilen."
            }
        ]
    },
    "en": {
        "title": "Mince-Stuffed Apple Halves",
        "steps": [
            {
                "title": "Apples",
                "text": "Scoop out the apples, leaving a rim approx. 1 cm wide. Roughly chop the flesh and set aside. Transfer the apples to the prepared dish. In a bowl, mix the mince with all the ingredients up to and including the paprika, knead well by hand until the ingredients have combined to form a compact mass. With wet hands, shape into 8 equal-sized balls. Fill the apples with the mixture. Wrap the bacon around the apples.",
                "ingredients": [
                    [4, "", "apples, halved crosswise, cores removed"],
                    [400, "g", "minced meat (beef)"],
                    [1, "tbsp", "parsley, finely chopped"],
                    [1, "", "onion, finely chopped"],
                ]
            },
            {
                "title": "Cranberry & apple sauce",
                "text": "Puree the apple flesh with the cranberries. Add the thyme.",
                "ingredients": [
                    [100, "", "cranberries from a jar"],
                    [0.5, "tsp", "thyme leaf"],
                ]
            },
            {
                "title": "Bake",
                "text": "For approx. 15 mins. in the centre of an oven preheated to 220°C. Remove and top with the cranberry & apple sauce."
            }
        ]
    },
    "fr": {
        "title": "Pommes farcies aux boulettes de viande",
        "steps": [
            {
                "title": "Pommes",
                "text": "Evider les pommes. Hacher la pulpe grossièrement, la réserver. Disposer les pommes dans le moule graissé. Dans un saladier, mélanger la viande hachée avec tous les ingrédients jusqu'au paprika compris et pétrir jusqu'à ce que la masse devienne compacte. S'humidifier les mains et former 8 boulettes de taille égale. En farcir les pommes. Envelopper les pommes avec le lard.",
                "ingredients": [
                    [4, "", "pommes coupées en deux, épépinées"],
                    [400, "g", "de viande hachée (bœuf)"],
                    [1, "cc", "de persil ciselé"],
                    [1, "", "oignon haché menu"],
                ]
            },
            {
                "title": "Sauce aux airelles et à la pomme",
                "text": "Réduire la pulpe de pomme et les airelles en purée. Ajouter le thym.",
                "ingredients": [
                    [100, "", "d’airelles en conserve"],
                    [0.5, "cc", "de feuilles de thym"],
                ]
            },
            {
                "title": "Cuisson",
                "text": "Faire cuire pendant env. 15 min. au milieu du four préchauffé à 220 °C. Arroser avec la sauce à la sortie du four."
            }
        ]
    },
    "it": {
        "title": "Mele ripiene con polpette di carne",
        "steps": [
            {
                "title": "Mele",
                "text": "Scavare le mele fino a ottenere un bordo largo ca. 1 cm. Tritare grossolanamente la polpa e metterla da parte. Trasferire le mele nello stampo imburrato. In un recipiente mescolare la carne macinata con tutti gli ingredienti fino alla paprica inclusa, lavorare bene a mano ottenendo un composto compatto. Con le mani bagnate ottenere 8 polpettine di uguali dimensioni e riempirvi le mele. Avvolgere le mele con la pancetta.",
                "ingredients": [
                    [4, "", "mele, dimezzate di traverso, private del torsolo"],
                    [400, "g", "carne macinata (manzo)"],
                    [1, "c.", "prezzemolo, tagliato finemente"],
                    [1, "", "cipolla, tritata finemente"],
                ]
            },
            {
                "title": "Salsa di mirtilli rossi e mela",
                "text": "Frullare la polpa di mele con i mirtilli rossi e unire il timo.",
                "ingredients": [
                    [100, "", "mirtilli rossi in vasetto"],
                    [0.5, "c.no", "foglioline di timo"],
                ]
            },
            {
                "title": "In forno",
                "text": "Cuocerle per ca. 15 min. nella parte centrale del forno preriscaldato a 220 °C. Sfornarle e cospargere con la salsa di mirtilli rossi e mela."
            }
        ]
    }
}

$: recipe = recipes[$locale.split('-')[0]];

function openCookingView() {
    cookingModeOpen = !cookingModeOpen;
}
</script>

<svelte:head>
	<title>{recipe.title}</title>
</svelte:head>

<CookingView
    bind:recipe={recipe}
    bind:open={cookingModeOpen}
></CookingView>

<h1>{recipe.title}</h1>

<div class="info">
    <img src="recipe.jpg" alt="Rezept">
    <div class="ingredients">
        <h2>Zutaten</h2>
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

<div>
    <Button on:click={openCookingView}>
        <svg slot="icon" width="32px" height="32px" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
            <path d="M99.1 97.14H59.3a1.5 1.5 0 01-1.5-1.5V51.86a21.4 21.4 0 0142.8 0v8.87c6.28-2.25 10.28-2.24 12.51 0 2.62 2.67 4.16 9.27-12.74 35.69a1.51 1.51 0 01-1.27.72zm-38.3-3h37.48c15.39-24.2 14-29.93 12.69-31.28-.82-.83-3.39-1.76-11.3 1.45a1.54 1.54 0 01-1.41-.15 1.52 1.52 0 01-.66-1.25v-11a18.4 18.4 0 10-36.8 0zM99.1 105.1H59.3a1.5 1.5 0 110-3h39.8a1.5 1.5 0 010 3z"/>
            <path d="M52.71 89.18H28.65a1.51 1.51 0 01-1.27-.69C10.48 62.07 12 55.47 14.64 52.8c2.23-2.27 6.23-2.28 12.51 0v-8.9a21.4 21.4 0 0134-17.3 1.5 1.5 0 01-1.77 2.4 18.4 18.4 0 00-29.23 14.9V55a1.52 1.52 0 01-.66 1.25 1.54 1.54 0 01-1.41.15c-7.91-3.21-10.48-2.28-11.3-1.45-1.32 1.35-2.7 7.08 12.69 31.28h23.24a1.5 1.5 0 110 3zM53.33 97.14H28.46a1.5 1.5 0 110-3h24.87a1.5 1.5 0 010 3z"/>
        </svg>
        <span>Let's cook</span>
    </Button>
</div>

<div class="steps">
    <h2>Schritte</h2>
    <ul>
        {#each recipe.steps as step}
            <li>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
            </li>
        {/each}
    </ul>
</div>

<style>
.info {
    display: flex;
    align-items: flex-start;
}

img {
    width: 50%;
    margin-right: 40px;
}

.ingredients ul,
.steps ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.info,
.steps {
    margin: 40px 0;
}

.ingredients > ul > li:not(:first-child) {
    margin-top: 20px;
}
</style>