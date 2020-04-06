<template>
    <main class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Страница помощи</h1>
        <p class="lead">Здесь вы можете найти ответы на ваши вопросы и узнать о принципах работы нашего сервиса.</p>

        <div class="card-columns p-5">
            <SubcriptionCard></SubcriptionCard>
        </div>

    </main>
</template>

<script>
    import SubcriptionCard from "../components/SubscriptionCard";

    export default {
        name: 'Support',
        components: {
            SubcriptionCard,
        },
    }
</script>

<style scoped>
</style>
