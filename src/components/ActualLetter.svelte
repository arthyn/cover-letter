<script>
    import { theirName } from '../utils/stores'
    import Thanks from './Thanks.svelte'
</script>

<section class="flex flex-col justify-center items-center text-lg sm:text-xl">
    <article class="max-w-4xl">
        <h2 class="font-bold text-3xl sm:text-4xl leading-none mb-8">There are no other candidates like me.</h2>
        <p>Building successful products requires finding common language and communicating problems accurately. I do that by getting involved early with projects and have no problems asking tough questions. Whether it's customers, stakeholders, clients, or coworkers, understanding what they have to say is the most important part of my job.</p>
        <p>When asked to build a 360 degree viewer for our diamond and gemstone products at work, I didn't just pull a library off the internet. I built a viewer from scratch to use video instead of images taking full advantage of video compression. I didn't just convert images to video and call it a day either. I experimented with multiple forms of compression until we found the best looking video at the smallest size. The results? A total payload that's one fifth to one third the size of the same viewer made with images.</p>
        <p>I will push on every boundary I can to find what's essential and bring it into focus.</p>
        <div class="text-center">
            <h2 class="font-bold text-2xl sm:text-4xl leading-tight mt-16 mb-4">{ $theirName ? $theirName + ', if' : 'If' } that doesn't scare you,<br class="hidden sm:block"> contact me and let's work together.</h2>
            <div class="flex flex-col items-center sm:block mb-12">
                <a class="button control inline-block flex-auto" href="mailto:hunter@hmiller.dev" target="_blank">Email me</a>
                <span class="my-2 sm:my-0 mx-4 text-xl leading-none">or</span>
                <a class="button control inline-block flex-auto" href="https://calendly.com/hunter-miller/chat" target="_blank">Schedule a chat</a>
            </div>
            <p>Or if you'd like to see more about me,<br>you can visit my website at <a class="hover:underline text-teal-300" href="https://hmiller.dev"><strong>hmiller.dev &#10142;</strong></a></p>
            <Thanks class="w-full max-w-md mx-auto"/>
        </div>
    </article>    
</section>

<style>
    p {
        margin-bottom: 1.5rem;
    }
</style>