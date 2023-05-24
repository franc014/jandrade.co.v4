<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let loading = false;

  let data = {
    email: "",
    name: "",
    message: "",
    masterLenina: "",
  };

  async function sendContact() {
    loading = true;
    const sendEmail = await fetch("/api/contact.json", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await sendEmail.json();

    if (sendEmail.status === 400) {
      dispatch("emailSent", {
        error: true,
        status: sendEmail.status,
        message: res.message,
      });
    } else if (sendEmail.status === 200) {
      dispatch("emailSent", {
        error: false,
        status: sendEmail.status,
        message: res.message,
      });
    }

    loading = false;
    data = {
      email: "",
      name: "",
      message: "",
      masterLenina: "",
    };
  }
</script>

<form on:submit|preventDefault={sendContact}>
  <input type="hidden" name="masterLenina" bind:value={data.masterLenina} />
  <fieldset class="flex flex-col">
    <label for="email" class="mb-8">
      Email:
      <input
        required
        class="element"
        type="email"
        name="email"
        placeholder="Your Email Address"
        autocomplete="email"
        bind:value={data.email}
      />
    </label>
    <label for="name" class="mb-8">
      Name:
      <input
        required
        class="element"
        type="text"
        name="name"
        placeholder="Your Name"
        autocomplete="name"
        bind:value={data.name}
      />
    </label>
    <label for="message" class="mb-8">
      Message:
      <textarea
        bind:value={data.message}
        required
        name="message"
        class="element h-32"
      />
    </label>
  </fieldset>
  <button
    disabled={loading}
    class="mt-4 bg-base-normal shadow-md tracking-wide active:ring ring-inset ring-base-normal text-white-canvas px-4 py-1 rounded"
  >
    {loading ? "...Sending" : "Send"}
  </button>
</form>

<style>
  label {
    @apply flex flex-col gap-4 tracking-wide;
  }
  .element {
    @apply bg-white-canvas  text-gray-normal px-4 py-2  rounded border border-gray-lighter border-b-4 border-b-base-normal;
  }

  @media (min-width: 800px) {
    .element {
      max-width: 80%;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus {
    -webkit-text-fill-color: #404040;
    -webkit-box-shadow: 0 0 0px 1000px #eff1f3 inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  button[disabled] {
    @apply bg-gray-light text-white-canvas pointer-events-none;
  }
</style>
