<template>
    <div class="petChars">
        <p>{{ petCharsAge }} - {{ petCharsGender }} - {{ petCharsSize }} - {{ petCharsColor }}</p>
    </div>
</template>

<script>
export default {
  name: 'petChars',
  props: ['petCharsAge', 'petCharsGender', 'petCharsSize', 'petCharsColor', 'petCharsCoat', 'petCharsTrained', 'petCharsNeeds', 'petCharsEnvironment'],
}
</script>

