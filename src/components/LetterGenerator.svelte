<script>
    import { generateTemplateLetter } from '../utils/api'
    import { letterText, shredderElement, theirName, status, statusTypes } from '../utils/stores'

    let job = 'Software Developer';
    let company = 'Modern Digital';

    function generate() {
        $letterText = generateTemplateLetter(job || 'Software Developer', company || 'Modern Digital');
        console.log($shredderElement);
        $status = statusTypes.shredder;
        //$shredderElement.scrollIntoView({ behavior: 'smooth' });
    }

</script>

<form class="text-xl sm:text-2xl" on:submit|preventDefault={generate}>
    <div class="leading-looser mb-8">
        If you could introduce yourself as
        <div class="relative inline leading-none">
            <input id="yourName" class="control w-40 sm:w-48 -mb-2 py-1 px-2 text-center border-b-2" type="text" required bind:value={$theirName}>
            <label for="yourName" class="absolute left-0 inline-block w-full text-center font-semibold opacity-75">your name</label>
        </div>, where you
        <div class="relative inline leading-none">
            <input id="company" class="control w-40 sm:w-48 -mb-2 py-1 px-2 text-center border-b-2" type="text" required bind:value={company}>
            <label for="company" class="absolute left-0 inline-block w-full text-center font-semibold opacity-75">work</label>
        </div>, and
        <div class="relative inline leading-none">
            <input id="position" class="control w-48 sm:w-64 -mb-2 py-1 px-2 text-center border-b-2" type="text" required bind:value={job}>
            <label for="position" class="absolute left-0 inline-block w-full text-center font-semibold opacity-75">the position</label>
        </div> you're hiring for, then we can move on to the letter. 
    </div>
    <button class="button control">See the letter</button>
</form>

<style lang="scss">
    .leading-looser {
        line-height: 2.25
    }

    input:invalid {
        box-shadow: none !important;
    }

    input {
        &:valid + label,
        &:focus + label {
            opacity: 1;
            transform: translateY(calc(100% + .25rem)) scale(.7);
        }
    }

    label {
        top: .25rem;
        transition: transform .2s;
        cursor: pointer;
    }
</style>