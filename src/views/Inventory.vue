<template>
  <Heading title="Products & Inventory" class="mb-4" />

  <AgGridVue
    style="width: 100%; height: 500px"
    class="ag-theme-quartz"
    :rowData="products"
    :columnDefs="colDefs"
    :theme="myTheme"
    :gridOptions="gridOptions"
    page-siz
    :pagination="true"
    :defaultColDef="defaultColDef"
    @grid-ready="onGridReady"
    :paginationPageSize="10"
    :domLayout="'autoHeight'"
  ></AgGridVue>

  <PrimeDialog
    v-model:visible="visible"
    des
    modal
    header="Update Stock"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">New stock</label>
      <PrimeInputNumber v-model="newStock" :min="0" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <PrimeButton
        type="button"
        label="Cancel"
        size="small"
        severity="secondary"
        @click="visible = false"
      />
      <PrimeButton
        size="small"
        type="button"
        label="Update"
        @click="updateStock"
        :disabled="newStock <= 0"
      />
    </div>
  </PrimeDialog>
</template>

<script setup lang="ts">
import ProductImage from '@/components/productImage/ProductImage.vue'
import UpdateStockBtn from '@/components/updateStock/UpdateStock.vue'
import { productsService } from '@/services/products'
import type { Product } from '@/types'
import { $dt } from '@primeuix/themes'
import { themeQuartz } from 'ag-grid-community'
import type { AgFieldParams, GridReadyEvent } from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { useToast } from 'primevue/usetoast'
const toast = useToast()

const visible = ref<boolean>(false)
const newStock = ref<number>(0)
const rowToUpdate = ref<Product | null>(null)

const products = ref<Product[]>([])
const gridApi = ref<GridReadyEvent['api']>()

const myTheme = themeQuartz.withParams({
  foregroundColor: '#FFF',
  backgroundColor: $dt('neutral.700').value,
  textColor: $dt('zinc.300').value,
  headerBackgroundColor: $dt('zinc.900').value,
})

const onGridReady = (params: GridReadyEvent) => {
  gridApi.value = params.api
}

const gridOptions = {
  getRowId: (params: any) => params.data.id,
  paginationPageSizeSelector: false,
}

const handleClick = (data: any) => {
  console.log('data: ', data)
  newStock.value = data.stock
  rowToUpdate.value = data
  visible.value = true
}

const updateStock = async () => {
  try {
    await productsService.updateProduct({ newStock: newStock.value, id: rowToUpdate.value!.id })
    toast.add({
      severity: 'success',
      summary: 'Stock updated',
      detail: 'Stock updated successfully!',
      life: 3000,
    })
    visible.value = false
    gridApi.value!.applyTransaction({
      update: [
        {
          ...rowToUpdate.value!,
          stock: newStock.value,
        },
      ],
    })
  } catch (error) {
    console.error('Error updating stock:', error)
  }
}

const colDefs = ref([
  { headerName: 'ID', field: 'id', sortable: false, editable: false },
  { headerName: 'Name', field: 'name', sortable: true, filter: true, editable: false },
  { headerName: 'Category', field: 'category', sortable: true, filter: true, editable: false },
  {
    headerName: 'Product Image',
    field: 'imageUrl',
    cellRenderer: ProductImage,
    sortable: false,
    filter: false,
    editable: false,
  },
  {
    headerName: 'Price',
    field: 'price',
    valueFormatter: (params: AgFieldParams) => `$${params.value.toFixed(2)}`,
    sortable: true,
    filter: 'agNumberColumnFilter',
    editable: false,
  },
  {
    headerName: 'Stock',
    field: 'stock',
    sortable: true,
    filter: 'agNumberColumnFilter',
    editable: true,
    cellStyle: (params: AgFieldParams) =>
      params.value <= 10 ? { color: 'white', backgroundColor: $dt('red.700').value } : null,
  },
  {
    headerName: 'Actions',
    cellRenderer: UpdateStockBtn,
    cellRendererParams: {
      clicked: handleClick,
    },
    editable: false,
    sortable: false,
    filter: false,
    resizable: false,
  },
])

const defaultColDef = {
  flex: 1,
  minWidth: 100,
  resizable: true,
}
onMounted(async () => {
  try {
    const _products = await productsService.getProducts()
    products.value = _products
    console.log('Products fetched:', _products)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})
</script>
