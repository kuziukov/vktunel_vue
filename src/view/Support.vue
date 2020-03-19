<template>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Страница помощи</h1>
        <p class="lead">Здесь вы можете найти ответы на ваши вопросы и узнать о принципах работы нашего сервиса.</p>

        <div class="card-deck">
            <SubcriptionCard></SubcriptionCard>
            <SubscriptionCompleteCard></SubscriptionCompleteCard>
            <PlanSelectionCard></PlanSelectionCard>
        </div>

    </div>
</template>

<script>
    import SubcriptionCard from "../components/SubscriptionCard";
    import PlanSelectionCard from "../components/PlanSelectionCard";
    import SubscriptionCompleteCard from "../components/SubscriptionCompleteCard";

    export default {
        name: 'Support',
        components: {
            SubscriptionCompleteCard,
            PlanSelectionCard,
            SubcriptionCard,
        },
    }
</script>

<style scoped>
</style>
