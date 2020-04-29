<script>
    import { generateTemplateLetter } from '../utils/api'
    import { letterText, shredderElement } from '../utils/stores'

    let name = '';
    let job = '';
    let company = '';

    function generate() {
        $letterText = generateTemplateLetter(job || 'Software Developer', company || 'Modern Digital');
        console.log($shredderElement)
        $shredderElement.scrollIntoView({ behavior: 'smooth' });
    }

</script>

<form class="max-w-2xl w-full mx-auto text-xl" on:submit|preventDefault={generate}>
    <div class="flex mb-10">
        <label for="yourName" class="mr-8 font-bold">Your Name:</label>
        <input id="yourName" class="control flex-1 py-1 px-2 border-b-2" type="text" bind:value={name}>
    </div>
    <div class="flex mb-10">
        <label for="position" class="mr-8 font-bold">Position You're Hiring:</label>
        <input id="position" class="control flex-1 py-1 px-2 border-b-2" type="text" bind:value={job}>
    </div>
    <div class="flex mb-10">
        <label for="company" class="mr-8 font-bold">Your Company Name:</label>
        <input id="company" class="control flex-1 py-1 px-2 border-b-2" type="text" bind:value={company}>
    </div>
    <div class="flex justify-end">
        <button class="button control">See the letter</button>
    </div>
</form>