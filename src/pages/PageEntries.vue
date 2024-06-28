<template>
    <q-page>
        <div class="q-pa-md">
            <q-list bordered separator>
                <q-item v-for="(entry) in entries" :key="entry.id">
                    <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
                        {{ entry.name }}
                    </q-item-section>

                    <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)" side>
                        {{ useCurrencify(entry.amount) }}
                    </q-item-section>
                </q-item>
            </q-list>
        </div>
        <q-footer class="bg-transparent">
            <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
                <div class="col text-grey-7 text-h6">
                    Balance:
                </div>
                <div :class="useAmountColorClass(balance)" class="col text-h6 text-right">
                    {{ useCurrencify(balance) }}
                </div>
            </div>
            <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
                <div class="col">
                    <q-input outlined placeholder="Name" bg-color="white" dense />
                </div>
                <div class="col">
                    <q-input input-class="text-right" placeholder="Amount" bg-color="white" type="number" step="0.01" outlined dense />
                </div>
                <div class="col col-auto">
                    <q-btn round color="primary" icon="add" />
                </div>
            </div>
        </q-footer>
    </q-page>
</template>

<script setup>
// import
// 分別匯入vue相關函數
import { ref, computed } from 'vue'
// 匯入封裝的貨幣呈現 格式化函數
import { useCurrencify } from "src/use/useCurrency.js";
// 匯入封裝的金流顯色函數
import { useAmountColorClass } from "src/use/useAmountColorClass.js";
defineOptions({
    name: 'IndexPage'
});

// entries
// 初期預設資料 用以打造、預覽結構和樣式，未來通常改串接API取得伺服器資料
const entries = ref([{
        id: 'id1',
        name: 'Salary',
        amount: 4999.99

    },
    {
        id: 'id2',
        name: 'Rent',
        amount: -999

    },
    {
        id: 'id3',
        name: 'Phone',
        amount: -14.99

    },
    {
        id: 'id4',
        name: 'Unknown',
        amount: 0

    }
])

// balance
// 加總計算
const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
        return accumulator + amount
    }, 0)
})
</script>
