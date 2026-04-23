import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Cài đặt website',
  type: 'document',

  groups: [
    {name: 'nav',   title: 'Homepage & Navbar', default: true},
    {name: 'notif', title: 'Thông báo'},
    {name: 'social',title: 'Mạng xã hội'},
  ],

  fields: [
    // ── Homepage ─────────────────────────────────────────────────────────────
    defineField({
      name: 'featuredProducts',
      title: 'Sản phẩm nổi bật (Homepage)',
      description: 'Chọn và sắp xếp thứ tự sản phẩm hiện trên trang chủ (tối đa 8)',
      type: 'array',
      group: 'nav',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      validation: Rule => Rule.max(8),
    }),

    // ── Navbar ───────────────────────────────────────────────────────────────
    defineField({
      name: 'navLeft',
      title: 'Menu trái',
      description: 'Các link bên trái navbar (shop, collections, custom…)',
      type: 'array',
      group: 'nav',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Tên hiển thị', type: 'string', validation: R => R.required()}),
            defineField({name: 'href',  title: 'Đường dẫn',    type: 'string', description: 'Ví dụ: shop.html hoặc /collections'}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        },
      ],
    }),
    defineField({
      name: 'navRight',
      title: 'Menu phải',
      description: 'Các link bên phải navbar (instagram, about…)',
      type: 'array',
      group: 'nav',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'label',     title: 'Tên hiển thị', type: 'string', validation: R => R.required()}),
            defineField({name: 'href',      title: 'Đường dẫn',    type: 'string'}),
            defineField({name: 'external',  title: 'Mở tab mới',   type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        },
      ],
    }),

    // ── Notification bar ─────────────────────────────────────────────────────
    defineField({
      name: 'notifBarVi',
      title: 'Thanh thông báo (Tiếng Việt)',
      type: 'text',
      rows: 2,
      group: 'notif',
    }),
    defineField({
      name: 'notifBarEn',
      title: 'Thanh thông báo (Tiếng Anh)',
      type: 'text',
      rows: 2,
      group: 'notif',
    }),

    // ── Social ───────────────────────────────────────────────────────────────
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
  ],
})
