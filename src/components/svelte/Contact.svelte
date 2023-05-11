<script>
  import { fly, fade } from "svelte/transition";
  import ContactForm from "./ContactForm.svelte";
  let message = "";
  let resSuccess;
  let resError;

  function wait(ms = 0) {
    return new Promise((resolve, reject) => setTimeout(resolve, ms));
  }

  async function handleResult(event) {
    resSuccess = !event.detail.error;
    resError = !resSuccess;
    message = event.detail.message;
    await wait(4000);
    message = "";
  }
</script>

<ContactForm on:emailSent={handleResult} />
{#if message !== ""}
  <p
    in:fly={{ x: -200, duration: 800 }}
    out:fade
    class:resSuccess
    class:resError
  >
    {message}
  </p>
{/if}

<style>
  .resSuccess {
    @apply bg-lime-600 border  text-white-canvas p-4 rounded text-sm shadow-md;
  }
  .resError {
    @apply bg-red-500 border  text-white-canvas p-4 rounded text-sm shadow-md;
  }
</style>
