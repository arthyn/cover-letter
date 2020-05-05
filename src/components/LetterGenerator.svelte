<script>
    import { generateTemplateLetter } from '../utils/api'
    import { debug } from '../utils/settings'
    import { letterText, theirName, status, statusTypes } from '../utils/stores'

    let job = debug ? 'Software Developer' : '';
    let company = debug ? 'Modern Digital' : '';

    function generate() {
        $letterText = generateTemplateLetter(job || 'Software Developer', company || 'Modern Digital');
        $status = statusTypes.shredder;
    }

</script>

<form class="text-xl sm:text-2xl" on:submit|preventDefault={generate}>
    <div class="leading-looser mb-8">
        Please introduce yourself! You are
        <div class="relative inline leading-none">
            <input id="yourName" class="control w-40 sm:w-48 -mb-2 sm:py-1 px-2 text-center border-b-2" type="text" required bind:value={$theirName}>
            <label for="yourName" class="absolute left-0 inline-block w-full text-center font-semibold opacity-75">your name</label>
        </div>, a hiring manager at,
        <div class="relative inline leading-none">
            <input id="company" class="control w-40 sm:w-48 -mb-2 sm:py-1 px-2 text-center border-b-2" type="text" required bind:value={company}>
            <label for="company" class="absolute left-0 inline-block w-full text-center font-semibold opacity-75">company</label>
        </div>, looking to hire a
        <div class="relative inline leading-none">
            <input id="position" class="control w-48 sm:w-64 -mb-2 sm:py-1 px-2 text-center border-b-2" type="text" required bind:value={job}>
            <label for="position" class="absolute left-0 inline-block w-full text-center font-semibold opacity-75">the position</label>
        </div>.
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
            transform: translateY(100%) scale(.7);

            @media (min-width: 640px) {
                transform: translateY(calc(100% + .25rem)) scale(.7);
            }
        }
    }

    label {
        top: .25rem;
        transition: transform .2s;
        cursor: pointer;
    }
</style>