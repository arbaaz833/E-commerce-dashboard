<template>
  <Heading title="Create Product" />
  <PrimeForm
    v-slot="$form"
    :resolver="resolver"
    :initialValues="initialValues"
    @submit="onFormSubmit"
    class="flex flex-col gap-2 w-full"
  >
    <div class="flex flex-col gap-1">
      <label class="font-semibold">Name</label>
      <PrimeInputText name="name" type="text" placeholder="Product Name" fluid />
      <PrimeMessage v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
        $form.name.error?.message
      }}</PrimeMessage>
    </div>
    <div class="flex flex-col gap-1">
      <label class="font-semibold">Description</label>
      <PrimeInputText name="description" type="text" placeholder="Product description" fluid />
      <PrimeMessage
        v-if="$form.description?.invalid"
        severity="error"
        size="small"
        variant="simple"
        >{{ $form.description.error?.message }}</PrimeMessage
      >
    </div>
    <div class="flex flex-col gap-1">
      <label class="font-semibold">Category</label>
      <PrimeSelect
        name="category"
        :options="categories"
        placeholder="Select a category"
        class="min-w-60"
      />
      <PrimeMessage v-if="$form.category?.invalid" severity="error" size="small" variant="simple">{{
        $form.category.error?.message
      }}</PrimeMessage>
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-semibold">Price</label>
      <PrimeInputNumber
        name="price"
        type="text"
        placeholder="Product price"
        :defaultValue="0"
        fluid
      />
      <PrimeMessage v-if="$form.price?.invalid" severity="error" size="small" variant="simple">{{
        $form.price.error?.message
      }}</PrimeMessage>
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-semibold">Stock</label>
      <PrimeInputNumber name="stock" type="text" placeholder="Product initial stock" fluid />
      <PrimeMessage v-if="$form.stock?.invalid" severity="error" size="small" variant="simple">{{
        $form.stock.error?.message
      }}</PrimeMessage>
    </div>

    <div class="flex items-start flex-col gap-1">
      <label class="font-semibold">Image</label>
      <PrimeFileUpload
        pt:root="!border-0"
        ref="fileElem"
        @select="onFileSelect"
        name="file"
        accept="image/*"
        :maxFileSize="1000000"
      >
        <template #header="{ chooseCallback, clearCallback, files }">
          <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
            <div class="flex gap-2">
              <PrimeButton @click="chooseCallback()" label="Choose"></PrimeButton>
              <PrimeButton
                v-if="files && files.length > 0"
                @click="clearCallback()"
                icon="pi pi-times"
                rounded
                variant="text"
                severity="danger"
                :disabled="!files || files.length === 0"
              ></PrimeButton>
            </div>
          </div>
        </template>
        <template #content="{ files, uploadedFiles, messages }">
          <div class="flex flex-col gap-8 pt-4">
            <Message
              v-for="message of messages"
              :key="message"
              :class="{ 'mb-8': !files.length && !uploadedFiles.length }"
              severity="error"
            >
              {{ message }}
            </Message>

            <div v-if="files.length > 0">
              <div class="flex flex-wrap gap-4">
                <div
                  v-for="(file, index) of files"
                  :key="file.name + file.type + file.size"
                  class="p-2"
                >
                  <span
                    class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                    >{{ file.name }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </template>
      </PrimeFileUpload>
      <PrimeMessage v-if="fileError" severity="error" size="small" variant="simple"
        >Product image is required</PrimeMessage
      >
    </div>
    <div class="flex items-center justify-center">
      <PrimeButton type="submit" class="w-20" label="Submit" :disabled="loading" />
    </div>
  </PrimeForm>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import { z } from 'zod'
import { categories } from '@/constants'
import { productsService } from '@/services/products'

const toast = useToast()
const fileElem = useTemplateRef<any>('fileElem')
const fileError = ref<null | string>(null)
const loading = ref<boolean>(false)
const initialValues = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  file: {},
})

const resolver = ref(
  zodResolver(
    z.object({
      name: z
        .string()
        .trim()
        .min(3, { message: 'Product name should have a minimum length of 3 characters.' })
        .max(255, { message: 'Product name should have a maximum length of 255 characters.' })
        .nonempty({ message: 'Product name cannot be empty.' }),

      description: z
        .string()
        .trim()
        .min(10, { message: 'Product description should have a minimum length of 10 characters.' })
        .max(1000, {
          message: 'Product description should have a maximum length of 1000 characters.',
        })
        .nonempty({ message: 'Product description cannot be empty.' }),

      price: z
        .number()
        .positive({ message: 'Price must be a positive number.' })
        .nonnegative({ message: 'Price is required.' }),

      category: z.string().trim().nonempty({ message: 'Category is required' }),

      stock: z
        .number()
        .int({ message: 'Stock must be a whole number.' })
        .min(0, { message: 'Stock cannot be less than 0.' })
        .nonnegative({ message: 'Stock is required.' }),
    }),
  ),
)

const onFileSelect = (event: any) => {
  const file = event.files[0]
  if (file) {
    fileError.value = null
  }
}

const onFormSubmit = async (event: any) => {
  try {
    if (!fileElem.value.files || fileElem.value.files.length === 0) {
      fileError.value = 'Product image is required'
      return
    }
    if (!event.valid) return
    loading.value = true
    await productsService.createProduct({
      ...event.values,
      file: fileElem.value.files[0],
    })
    loading.value = false
    fileElem.value.files = []
    toast.add({
      severity: 'success',
      summary: 'Product created',
      detail: 'Product created successfully!',
      life: 3000,
    })
    event.reset()
  } catch (e) {
    loading.value = false
    console.error('e: ', e)
  }
}
</script>
