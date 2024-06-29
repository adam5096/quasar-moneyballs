<template>
    <q-page>
        <div class="q-pa-md">
            <q-list bordered separator>
                <!-- 滑動元件 -->
                <q-slide-item v-for="(entry) in entries" :key="entry.id"  @right="oneEntrySlideRight($event, entry)" left-color="positive" right-color="negative">
                    <!-- <template v-slot:left>
                      <q-icon name="done" />
                    </template> -->
                    <template v-slot:right>
                      <q-icon name="delete_forever" />
                    </template>
                  <!-- 事件項 -->
                  <q-item >
                    <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)">
                        {{ entry.name }}
                    </q-item-section>

                    <q-item-section class="text-weight-bold" :class="useAmountColorClass(entry.amount)" side>
                        {{ useCurrencify(entry.amount) }}
                    </q-item-section>
                  </q-item>
                </q-slide-item>
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
            <q-form @submit="addEntry" class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
                <!-- 名稱輸入 -->
                <div class="col">
                    <q-input ref="nameRef" v-model="addEntryForm.name" outlined placeholder="Name" bg-color="white" dense />
                </div>
                <!-- 金額輸入 -->
                <div class="col">
                    <!-- v-model.number 將數據存本地元件保存前先轉換成number格式 -->
                    <q-input v-model.number="addEntryForm.amount" input-class="text-right" placeholder="Amount" bg-color="white" type="number" step="0.01" outlined dense />
                </div>
                <!-- 送出表單 -->
                <div class="col col-auto">
                    <q-btn type="submit" round color="primary" icon="add" />
                </div>
            </q-form>
        </q-footer>
    </q-page>
</template>

<script setup>
// import
// 分別匯入vue相關函數
import { ref, reactive, computed } from 'vue'
// 分別匯入quasar提供的uid,useQuasar函數
import { uid,useQuasar } from 'quasar'
// 分別匯入客製封裝的貨幣呈現 格式化函數
import { useCurrencify } from "src/use/useCurrency.js";
// 分別匯入封裝的金流顯色函數 income綠色 expense紅色
import { useAmountColorClass } from "src/use/useAmountColorClass.js";
defineOptions({
    name: 'IndexPage'
});

// useQuasar實例化
const $q = useQuasar()

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

// 建立輸入框實例 placeholder="Name"
// 後續實作輸入框取得焦點
const nameRef = ref(null)

// 建立一個"清空數據時"，要恢復到此的數據狀態，數據初始態
const addEntryFormDefault = {
    name: '',
    amount: null
}

// add entry
// 1. 保存 即將新增的資料 input placeholder為Name Amount的兩個輸入框
// 2. 表單上的雙項數據綁定互動對象都以此為主要窗口
// 3. 與 數據初始態 分隔開，確保數據流向的固定
const addEntryForm = reactive({
    ...addEntryFormDefault
})

// 清空前次輸入框遺留內容
const addEntryFormReset = () => {
    // 寫法一
    // console.log('reset');
    // addEntryForm.name = ''
    // number型別數據清空建議使用null
    // addEntryForm.amount = null

    // 寫法二
    Object.assign(addEntryForm, addEntryFormDefault)

    // 輸入框再次獲得焦點 節約瑣碎的滑鼠操作
    nameRef.value.focus()
}

// 點擊按鈕 q-btn icon="add" 後的邏輯
// @submit 監聽事件綁在q-form元素的開始標籤裡面，而非q-btn icon="add"上哦
const addEntry = () => {
    // console.log('addEntry');

    // 寫法一
    // const newEntry = {
    //   id:uid(),
    //   name:addEntryForm.name,
    //   amount:addEntryForm.amount
    // }

    // 寫法二
    // 1. 語法 Object.assign(既有陣列,新陣列,合併陣列中要新增的屬性名、值)
    // 2. 第3參數是 既有陣列與新陣列中都沒有的全新屬性與值，如果想要新增這樣性質的屬性可以往第3參數位置書寫
    const newEntry = Object.assign({}, addEntryForm, { id: uid() })
    // console.log('newEntry',newEntry);
    // 將使用者輸入內容推送到列尾部並重新渲染至頁面上
    entries.value.push(newEntry)
    // 清空前次輸入框遺留內容
    addEntryFormReset()
}

// 當對事件項左滑刪除時的邏輯
// 解構並取出預入物件details中的屬性reset
const oneEntrySlideRight = ({reset},entry) => {
    // console.log('right');
    // 使用彈出對話窗
    $q.dialog({
        title: '刪除此筆紀錄',
        message: `
        確定刪除嗎?
        <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
          ${ entry.name } : ${ useCurrencify(entry.amount) }
        </div>
        `,
        cancel: true,
        persistent: true,
        html:true,
        ok:{
          label:'刪除',
          color:'negative',
          noCaps:true
        },
        cancel:{
          label:'保留',
          color:'primary',
          noCaps:true
        },
      }).onOk(() => {
        // console.log('>>>> OK')
        deleteEntry(entry.id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
        // 如果點擊 保留按鈕，則把事件項重置回到初始狀態
        reset()
      })
}

// delete
// 刪除事件項
const deleteEntry = (entryId) => {
  //  console.log('delete',entryId);
  // 先拿到被刪除項中對應的id(也就是entryId) 拿它比對我的元件本地所存資料項id(也就是entry.id)
  const index = entries.value.findIndex(entry => entry.id === entryId )
  // console.log('index',index);
  // 使用陣列方法splice，參數2個：從下標index處，刪除1位 => 刪除點擊項
  entries.value.splice(index,1)
  // 快顯通知使用者
  $q.notify({
    message:'資料已刪除',
    position:'top'
  })
}
</script>
