<template>
    <b-alert show variant="danger">
        <p><b-icon icon="exclamation-circle-fill" variant="danger"></b-icon> We're sorry, we're unable to retrieve any current adoptable pets, please try back later.</p>
        <h4>Error:</h4>
        <p>{{ petError }}</p>
    </b-alert>
</template>

<script>
export default {
    name: 'petErrors',
    props: ['petError']
}
</script>