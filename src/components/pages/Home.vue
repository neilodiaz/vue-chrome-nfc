<template>
    <div>
        <ul>
            <li>Device Name: {{ deviceinfo.device_name }}</li>
            <li>Vendor ID: {{ deviceinfo.vendor_id }}</li>
            <li>Product ID: {{ deviceinfo.product_id }}</li>
        </ul>
        <button type="button" @click.prevent="detectCard">Detect Card</button>
        <br>
        <br>
        <p><strong>Card Info</strong></p>
        <ul>
            <li>Card ID: {{ cardinfo.card_id }}</li>
            <li>Text: {{ cardinfo.text }}</li>
        </ul>
        <button type="button" @click.prevent="readCard">Read Card</button>
        <br>
        <br>
        <p><strong>Write</strong></p>
        <label for="data">Text:</label>
        <input type="text" v-model="data">
        <button type="button" @click.prevent="writeCard">Write Card</button>
    </div>
</template>
<style>
    body {
        font-size: 18px;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    ul li {
        display: block;
        margin: 0;
        padding: 0;
    }
    p {
        margin: 0 0 10px;
        padding: 0;
    }
</style>
<script>
    export default {
        data() {
            return {
                data: ''
            }
        },

        computed: {
            deviceinfo() {
                return this.$store.state.device_info;
            },

            cardinfo() {
                return this.$store.state.card_info;
            }
        },

        methods: {
            detectCard() {
                this.$nfc.enumerateDevices()
            },

            readCard() {
                this.$nfc.runTagChecker()
            },

            writeCard() {
                this.$nfc.writeNdefTag('text', this.data)
            }
        }
    }
</script>