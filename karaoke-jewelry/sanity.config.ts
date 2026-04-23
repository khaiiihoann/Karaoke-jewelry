import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'karaoke-jewelry',

  projectId: 'idm6zp0i',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('KARAOKE JEWELRY')
          .items([
            S.listItem()
              .title('🛍 Tất cả sản phẩm')
              .schemaType('product')
              .child(
                S.documentTypeList('product')
                  .title('Tất cả sản phẩm')
                  .defaultOrdering([{field: 'sortOrder', direction: 'asc'}])
              ),
            S.divider(),
            S.listItem()
              .title('⚙️ Cài đặt website')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
