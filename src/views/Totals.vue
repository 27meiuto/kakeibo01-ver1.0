<template>
    <v-card>

      <!-- tab名表示 -->
      <v-toolbar color="cyan" dark>
        <v-tabs v-model="tabs" centered>
          <v-tab href="#tab-1" @click="select('1')">Total Amount</v-tab>
          <v-tab href="#tab-2" @click="select('2')">Breakdown</v-tab>
        </v-tabs>
      </v-toolbar>

      <!-- tab内容表示 -->
      <v-tabs-items v-model="tabs">
        <!-- 総合計内容表示 -->
        <v-tab-item value="tab-1">
          <v-card-title class="text-h5">{{ tabdetaileName }}</v-card-title>
          <v-card-text>
            <v-data-table class="text-no-wrap"
              :headers="tableHeaders"
              :items="tableData"
              :footer-props="footerProps"
              :loading="loading"
              :sort-by="'month'"
              :sort-desc="true"
              mobile-breakpoint="0">

              <template v-slot:[`item.house`]="{ item }">
                {{ separate(item.house) }}
              </template>
              <template v-slot:[`item.utilitycosts`]="{ item }">
                {{ separate(item.utilitycosts) }}
              </template>
              <template v-slot:[`item.food`]="{ item }">
                {{ separate(item.food) }}
              </template>
              <template v-slot:[`item.necessities`]="{ item }">
                {{ separate(item.necessities) }}
              </template>
              <template v-slot:[`item.pocketmoney`]="{ item }">
                {{ separate(item.pocketmoney) }}
              </template>
              <template v-slot:[`item.entertainment`]="{ item }">
                {{ separate(item.entertainment) }}
              </template>
              <template v-slot:[`item.communication`]="{ item }">
                {{ separate(item.communication) }}
              </template>
              <template v-slot:[`item.insurance`]="{ item }">
                {{ separate(item.insurance) }}
              </template>
              <template v-slot:[`item.savings`]="{ item }">
                {{ separate(item.savings) }}
              </template>
              <template v-slot:[`item.etc`]="{ item }">
                {{ separate(item.etc) }}
              </template>

            </v-data-table>
          </v-card-text>
        </v-tab-item>

        <!-- 内訳内容表示 -->
        <v-tab-item value="tab-2">
          <v-card-title class="text-h5">{{ tabdetaileName }}</v-card-title>
          <v-card-text>
            <p>test</p>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
      
    </v-card>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Totals',

  data () {
    return {
      tabs: 'tab-1',
      tabdetaileName: `総合計`,
      yearMonth: `9999-99`,
      tableData: [],
      footerProps: {'items-per-page-options': [12, 24, 36]}
    }
  },

  computed: {
    ...mapState({
      /** 家計簿データ */
      abData: state => state.abData,
      /** ローディング状態 */
      loading: state => state.loading.fetch,
    }),

    /** テーブルのヘッダー設定 */
    tableHeaders () {
      return [
        { text: '月', value: 'month', align: 'end' },
        { text: '家賃', value: 'house', sortable: false },
        { text: '光熱費', value: 'utilitycosts', sortable: false },
        { text: '食費', value: 'food', sortable: false },
        { text: '日用品', value: 'necessities', sortable: false },
        { text: '小遣い', value: 'pocketmoney', sortable: false },
        { text: '娯楽', value: 'entertainment', sortable: false },
        { text: '通信費', value: 'communication', sortable: false },
        { text: '保険', value: 'insurance', sortable: false },
        { text: '貯蓄', value: 'savings', sortable: false },
        { text: 'その他', value: 'etc', sortable: false }
      ]
    }
  },

  methods: {
    ...mapActions([
      /** 家計簿データを取得 */
      'fetchAbData'
    ]),
    select: function (num) {
      if(num == '1'){
        this.tabdetaileName = '総合計' 
        this.yearMonth = '9999-99' 
      }else if(num == '2'){
        this.tabdetaileName = '内訳' 
        this.yearMonth = 'work'
      }
      this.updateTable()
    },

    /** 表示させるデータを更新します */
    async updateTable () {
      const yearMonth = this.yearMonth
      const list = this.abData[yearMonth]

      if (list) {
        this.tableData = list
      } else {
        await this.fetchAbData({ yearMonth })
        this.tableData = this.abData[yearMonth]
      }
    },

    /**
     * 数字を3桁区切りにして返します。
     * 受け取った数が null のときは null を返します。
     */
    separate (num) {
      return num !== null ? num.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') : null
    }
  },

  created () {
    this.updateTable()
  }
}
</script>
