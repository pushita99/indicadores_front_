<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<Toast />
				<Toolbar class="mb-4">
					<template v-slot:start>
						<div class="my-2">
							<Button label="Añadir" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
							<Button label="Eliminar" icon="pi pi-trash" class="p-button-danger"
								@click="confirmDeleteSelected"
								:disabled="!selectedIndicatorcompanydirections || !selectedIndicatorcompanydirections.length" />
						</div>
					</template>
					<!-- 
					<template v-slot:end>
						<FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
						<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
					</template> -->
				</Toolbar>

				<DataTable ref="dt" :value="indicatorcompanydirections"
					v-model:selection="selectedIndicatorcompanydirections" dataKey="id" :paginator="true" :rows="10"
					:filters="filters"
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					:rowsPerPageOptions="[5, 10, 25]"
					currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} tipos de indicadores"
					responsiveLayout="scroll">
					<template #header>
						<div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
							<h5 class="m-0">Listado de indicadores</h5>
							<span class="block mt-2 md:mt-0 p-input-icon-left">
								<i class="pi pi-search" />
								<InputText v-model="filters['global'].value" placeholder="Buscar..." />
							</span>
						</div>
					</template>

					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

					<Column field="name" header="Indicador" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Año</span>
							{{slotProps.data.indicator.name}}
						</template>
					</Column>

					<Column field="name" header="Empresa" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Año</span>
							{{slotProps.data.company.name}}
						</template>
					</Column>

					<Column field="name" header="Dirección" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Año</span>
							{{slotProps.data.direction.name}}
						</template>
					</Column>

					<Column field="name" header="Valor" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Año</span>
							{{slotProps.data.value}}
						</template>
					</Column>

					<Column field="name" header="Fecha entrada" :sortable="true" headerStyle="width:14%; min-width:10rem;">
						<template #body="slotProps">
							<span class="p-column-title">Año</span>
							{{slotProps.data.date}}
						</template>
					</Column>

					<Column headerStyle="min-width:10rem;">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="editIndicatorcompanydirection(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning mt-2"
								@click="confirmDeleteIndicatorcompanydirection(slotProps.data)" />
						</template>
					</Column>
				</DataTable>

				<Dialog v-model:visible="indicatorcompanydirectionDialog" :style="{ width: '450px' }"
					header="Indicadores mes" :modal="true" class="p-fluid">

					<div class="field">
						<label for="companyId" class="mb-3">Empresa</label>
						<AutoComplete placeholder="Buscar Compañia" id="companyId" :dropdown="true" v-model="company"
							:suggestions="autoFilteredCompanies" @complete="searchCompanies($event)"
							:force-selection="true" field="name" />

					</div>

					<div v-for="(indicator, index) of indicators" :key="index" class="field col">
						<label for="name2">{{ indicator.name }}:</label>
						<InputText id="name2" type="number" v-model="tosave[index]" />
					</div>

					<template #footer>
						<Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
						<Button label="Guardar" icon="pi pi-check" class="p-button-text"
							@click="saveIndicatorcompanydirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatorcompanydirectionDialog" :style="{ width: '450px' }"
					header="Confirmar" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicatorcompanydirection">¿Seguro que desea eliminar
							<b>{{ indicatorcompanydirection.name }}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteIndicatorcompanydirectionDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text"
							@click="deleteIndicatorcompanydirection" />
					</template>
				</Dialog>

				<Dialog v-model:visible="deleteIndicatorcompanydirectionsDialog" :style="{ width: '450px' }"
					header="Confirm" :modal="true">
					<div class="flex align-items-center justify-content-center">
						<i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
						<span v-if="indicatorcompanydirection">¿Seguro que desea eliminar las planificaciones
							seleccionadas?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text"
							@click="deleteIndicatorcompanydirectionsDialog = false" />
						<Button label="Si" icon="pi pi-check" class="p-button-text"
							@click="deleteSelectedIndicatorcompanydirection" />
					</template>
				</Dialog>
			</div>
		</div>
	</div>

</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios';
import { useAuthStore } from '../../store/auth.store';

export default {
	data() {
		return {
			indicatorcompanydirections: null,
			indicatorcompanydirectionDialog: false,
			deleteIndicatorcompanydirectionDialog: false,
			deleteIndicatorcompanydirectionsDialog: false,
			indicatorcompanydirection: {},
			company: { name: "" },
			indicator: { name: "" },
			selectedIndicatorcompanydirections: null,
			filters: {},
			submitted: false,
			companies: [],
			indicators: [],
			autoFilteredIndicators: [],
			autoFilteredCompanies: [],
			tosave: []
		}
	},

	created() {

		this.initFilters();
	},
	async mounted() {
		this.loadData();
	},
	methods: {

		formatCurrency(value) {
			if (value)
				return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
			return;
		},
		openNew() {
			this.indicatorcompanydirection = {};
			this.submitted = false;
			this.indicatorcompanydirectionDialog = true;
		},
		hideDialog() {
			this.indicatorcompanydirectionDialog = false;
			this.submitted = false;
		},
		async saveIndicatorcompanydirection() {
			const datee = new Date();
			this.indicatorcompanydirection.date = datee;
			this.submitted = true;

			if (this.indicatorcompanydirection.id) {

				this.indicatorcompanydirections[this.findIndexById(this.indicatorcompanydirection.id)] = this.indicatorcompanydirection;
				this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicador modificado con éxito', life: 3000 });
			}
			else {

				try {
					for (let i = 0; i < this.indicators.length; i++) {
						await axios.post('http://localhost:3000/indicatorcompanydirection', {
							...this.indicatorcompanydirection,
							company: this.company.id,
							direction: useAuthStore().user.user.direction.id,
							indicator: this.indicators[i].id,
							value: this.tosave[i],
							
						});
						console.log(this.company.id);
						console.log(useAuthStore().user.user.direction.id);
						console.log(this.indicators[i].id);
						console.log(this.tosave[i]);
					}
					this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicador insertado con éxito', life: 3000 });
					this.loadData();
				} catch (error) {
					this.$toast.add({ severity: 'error', summary: 'Error', detail: error, life: 3000 });
					console.log(error);

				} finally {
					this.indicatorcompanydirectionDialog = false;
					this.indicatorcompanydirection = {};
				}
			}

		},
		editIndicatorcompanydirection(indicatorcompanydirection) {
			this.indicatorcompanydirection = { ...indicatorcompanydirection };
			this.indicatorcompanydirectionDialog = true;
		},
		confirmDeleteIndicatorcompanydirection(indicatorcompanydirection) {
			console.log("pase por ConfirmDeleteIndicatorcompanydirection");
			this.indicatorcompanydirection = indicatorcompanydirection;
			this.deleteIndicatorcompanydirectionDialog = true;
		},
		async deleteIndicatorcompanydirection() {
			console.log("pase por deleteIndicatorcompanydirection");
			console.log(this.indicatorcompanydirection.id);
			const response = await axios.delete('http://localhost:3000/indicatorcompanydirection/' + this.indicatorcompanydirection.id);
			console.log(response);
			this.deleteIndicatorcompanydirectionDialog = false;
			this.indicatorcompanydirection = {};
			this.$toast.add({ severity: 'success', summary: 'Operación exitosa', detail: 'Indicador eliminado', life: 3000 });
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.indicatorcompanydirections.length; i++) {
				if (this.indicatorcompanydirections[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},

		exportCSV() {
			this.$refs.dt.exportCSV();
		},
		confirmDeleteSelected() {
			console.log("pase por confirmDeleteSelected");
			this.deleteIndicatorcompanydirectionsDialog = true;
		},
		async deleteSelectedIndicatorcompanydirections() {
			console.log("pase por ConfirmDeleteIndicatorcompanydirection");
			await axios.delete('http://localhost:3000/indicatorcompanydirection/', this.indicatorcompanydirections);
			this.deleteIndicatorcompanydirectionsDialog = false;
			this.selectedIndicatorcompanydirections = null;
			this.$toast.add({ severity: 'success', summary: 'Successful', detail: 'Indicatorcompanydirections Deleted', life: 3000 });
		},
		initFilters() {
			this.filters = {
				'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
			}
		},
		loadData() {
			axios.get('http://localhost:3000/indicatorcompanydirection').then(
				(data) => {
					this.indicatorcompanydirections = data.data;
				}
			);
			axios.get(`http://localhost:3000/company/direction/${useAuthStore().user.user.direction.id}`).then(
				(data) => {
					this.companies = data.data;
				}
			);
			axios.get(`http://localhost:3000/indicator/direction/${useAuthStore().user.user.direction.id}`).then(
				(data) => {
					this.indicators = data.data;
				}
			);
		},
		searchIndicator(event) {
			setTimeout(() => {
				if (!event.query.trim().length) {
					this.autoFilteredIndicators = [...this.indicators];
				}
				else {
					this.autoFilteredIndicators = this.indicators.filter((indicator) => {
						return indicator.name.toLowerCase().startsWith(event.query.toLowerCase());
					});
				}
			}, 250);
		},
		searchCompanies(event) {
			setTimeout(() => {
				if (!event.query.trim().length) {
					this.autoFilteredCompanies = [...this.companies];
				}
				else {
					this.autoFilteredCompanies = this.companies.filter((company) => {
						return company.name.toLowerCase().startsWith(event.query.toLowerCase());
					});
				}
			}, 250);
		}
	}
}
</script>

<style scoped lang="scss">
@import '../src/assets/demo/badges.scss';
</style>
