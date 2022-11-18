<template>
    <div class="card">
        <div>
            <!-- class="p-datatable p-component p-datatable-responsive-scroll p-datatable-grouped-header p-datatable-grouped-footer"> -->
           
            <div class="p-datatable-wrapper">
                <!-- <table class="p-datatable-table" v-if="indicadores"> -->
                <table class="tabla" v-if="indicadores">
                    <!-- <thead class="p-datatable-thead"> -->
                    <thead class="">
                        <tr>
                            <th rowspan="3">
                                <div class="">
                                <!-- <div class="p-column-header-content"> -->
                                    <span class="p-column-title">Indicadores</span>
                                </div>

                            </th>
                            <th :colspan="2 * indicadores[0].companies.length">
                                <div class="p-column-header-content">
                                    <span class="p-column-title"> Empresas</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th v-for="empresa in indicadores[0].companies" colspan="2">
                                <div class="p-column-header-content">
                                    <span class="p-column-title">{{ empresa.name }}</span>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <template v-for="empresa in indicadores[0].companies">
                                <th>
                                    <div class="p-column-header-content">
                                        <span class="p-column-title">Plan</span>
                                    </div>
                                </th>
                                <th>
                                    <div class="p-column-header-content">
                                        <span class="p-column-title">Real</span>
                                    </div>
                                </th>
                            </template>
                        </tr>
                    </thead>
                    <tbody class="">
                    <!-- <tbody class="p-datatable-tbody"> -->
                        <tr v-for="indicador in indicadores">
                            <td>{{ indicador.name }}</td>
                            <template v-for="empresa in indicador.companies">
                                <td >
                                    {{ empresa.planification }}
                                </td>
                                <td >
                                    {{ empresa.value }}
                                </td>
                            </template>

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            sales: null,
            indicadores: null,
        }
    },
    created() {

    },
    methods: {
        formatCurrency(value) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
        async loadData() {
            try {
               const resource  = await axios.get("http://localhost:3000/reports/general_report/1");
                 this.indicadores = resource.data;
                } catch (e) {
                console.log(e);
            }
        }

    },
    computed: {
        lastYearTotal() {
            let total = 0;
            for (let sale of this.sales) {
                total += sale.lastYearProfit;
            }

            return this.formatCurrency(total);
        },
        thisYearTotal() {
            let total = 0;
            for (let sale of this.sales) {
                total += sale.thisYearProfit;
            }

            return this.formatCurrency(total);
        },
        ancho() {
            const columnas = this.indicadores[0].empresas.lenth + 1;
            return (100 / columnas);
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>
<style>
 .tabla tr > td {
    text-align: left;
    border: 1px solid #dee2e6;
    border-width: 0 0 1px 0 !important;
    padding: 1rem 1rem;

}
.tabla {
  border-collapse: collapse;
  width: 100%;
}

.tabla tr > th {
   text-align: left;
    border: 1px solid #dee2e6;
    border-width: 0 0 1px 0 !important;
    padding: 1rem 1rem;
    font-family: var(--font-family);
    font-weight: bold !important;
}
</style>