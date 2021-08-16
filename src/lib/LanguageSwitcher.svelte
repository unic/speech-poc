<script>
import { locale } from '../stores/app.js';
</script>

<select bind:value={$locale}>
    <option value="de-DE">Deutsch</option>
    <option value="fr-FR">Französisch</option>
    <option value="it-CH">Italienisch</option>
    <option value="en-US">Englisch (US)</option>
    <option value="en-GB">Englisch (GB)</option>
</select>