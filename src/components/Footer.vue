<template>
    <div class="footer">
        <div class="footer-copyright">
            {{ $t('copyrightFooter', { year: year, owner: 'Lyse'}) }}
        </div>
        <div class="footer-info">
            <h3>{{ $t('infoFooter') }}</h3>
            <p>{{ $t('contactUsFooter') }}</p>
            <p>{{ $t('aboutUsFooter') }}</p>
            <p>{{ $t('returnsFooter') }}</p>
            <p>{{ $t('shippingFooter') }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
    const d = new Date()
    const year = d.getFullYear()
</script>

<style lang="scss" scoped>
    .footer {
        padding: 10px 0;
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: space-around;
        background: var(--dark);
        .footer-copyright {
            padding-top: 3rem;
        }
    }
@media (max-width: 767px) {
    .footer {
        display: block;
        padding: 0;
        .footer-copyright {
            width: 80%;
            margin: 0 auto;
            text-align: center;
            padding-top: 1rem;
            font-size: 0.8rem;
        }
        .footer-info {
            > h3, > p {
                font-size: 1rem;
            }
        }
    }

}
</style>