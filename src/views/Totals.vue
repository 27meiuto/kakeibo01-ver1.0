<template>
    <v-card>

      <!-- tab名表示 -->
      <v-toolbar color="cyan" dark>
        <v-tabs v-model="tabs" centered>
          <v-tab href="#tab-1" @click="select('1')">Total Amount</v-tab>
          <v-tab href="#tab-2" @click="select('2')">Total Card</v-tab>
          <v-tab href="#tab-3" @click="select('3')">Total Cash</v-tab>
        </v-tabs>
      </v-toolbar>

      <!-- tab内容表示 -->
      <v-tabs-items v-model="tabs">
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

              <template v-slot:[`item.foodexpense`]="{ item }">
                {{ separate(item.foodexpense) }}
              </template>
              <template v-slot:[`item.eatout`]="{ item }">
                {{ separate(item.eatout) }}
              </template>
              <template v-slot:[`item.necessities`]="{ item }">
                {{ separate(item.necessities) }}
              </template>
              <template v-slot:[`item.toshi`]="{ item }">
                {{ separate(item.toshi) }}
              </template>
              <template v-slot:[`item.yuka`]="{ item }">
                {{ separate(item.yuka) }}
              </template>
              <template v-slot:[`item.travel`]="{ item }">
                {{ separate(item.travel) }}
              </template>
              <template v-slot:[`item.fixedost`]="{ item }">
                {{ separate(item.fixedost) }}
              </template>
              <template v-slot:[`item.etc`]="{ item }">
                {{ separate(item.etc) }}
              </template>

            </v-data-table>
          </v-card-text>
        </v-tab-item>

        <v-tab-item value="tab-2">
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

              <template v-slot:[`item.foodexpense`]="{ item }">
                {{ separate(item.foodexpense) }}
              </template>
              <template v-slot:[`item.eatout`]="{ item }">
                {{ separate(item.eatout) }}
              </template>
              <template v-slot:[`item.necessities`]="{ item }">
                {{ separate(item.necessities) }}
              </template>
              <template v-slot:[`item.toshi`]="{ item }">
                {{ separate(item.toshi) }}
              </template>
              <template v-slot:[`item.yuka`]="{ item }">
                {{ separate(item.yuka) }}
              </template>
              <template v-slot:[`item.travel`]="{ item }">
                {{ separate(item.travel) }}
              </template>
              <template v-slot:[`item.fixedost`]="{ item }">
                {{ separate(item.fixedost) }}
              </template>
              <template v-slot:[`item.etc`]="{ item }">
                {{ separate(item.etc) }}
              </template>

            </v-data-table>
          </v-card-text>
        </v-tab-item>

        <v-tab-item value="tab-3">
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

              <template v-slot:[`item.foodexpense`]="{ item }">
                {{ separate(item.foodexpense) }}
              </template>
              <template v-slot:[`item.eatout`]="{ item }">
                {{ separate(item.eatout) }}
              </template>
              <template v-slot:[`item.necessities`]="{ item }">
                {{ separate(item.necessities) }}
              </template>
              <template v-slot:[`item.toshi`]="{ item }">
                {{ separate(item.toshi) }}
              </template>
              <template v-slot:[`item.yuka`]="{ item }">
                {{ separate(item.yuka) }}
              </template>
              <template v-slot:[`item.travel`]="{ item }">
                {{ separate(item.travel) }}
              </template>
              <template v-slot:[`item.fixedost`]="{ item }">
                {{ separate(item.fixedost) }}
              </template>
              <template v-slot:[`item.etc`]="{ item }">
                {{ separate(item.etc) }}
              </template>

            </v-data-table>
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
      yearMonth: `9999-97`,
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
        { text: '食費', value: 'foodexpense', sortable: false },
        { text: '外食', value: 'eatout', sortable: false },
        { text: '日用品', value: 'necessities', sortable: false },
        { text: '私物(才王)', value: 'toshi', sortable: false },
        { text: '私物(友香)', value: 'yuka', sortable: false },
        { text: '旅行', value: 'travel', sortable: false },
        { text: '固定費', value: 'fixedost', sortable: false },
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
        this.yearMonth = '9999-97' 
      }else if(num == '2'){
        this.tabdetaileName = 'カード合計' 
        this.yearMonth = '9999-98' 
      }else if(num == '3'){
        this.tabdetaileName = '現金合計' 
        this.yearMonth = '9999-99' 
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
