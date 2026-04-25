import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Cài đặt website',
  type: 'document',

  preview: {
    prepare() {
      return {title: 'Cài đặt website', subtitle: 'Navbar, thông báo, homepage'}
    },
  },

  groups: [
    {name: 'homepage', title: 'Trang chủ', default: true},
    {name: 'nav',      title: 'Navbar'},
    {name: 'footer',   title: 'Footer'},
    {name: 'policies', title: 'Chính sách'},
    {name: 'notif',    title: 'Thông báo'},
    {name: 'social',   title: 'Mạng xã hội'},
  ],

  fields: [
    // ── Homepage ─────────────────────────────────────────────────────────────
    defineField({
      name: 'featuredProducts',
      title: 'Sản phẩm nổi bật',
      description: 'Chọn và sắp xếp thứ tự sản phẩm hiện trên trang chủ (tối đa 8)',
      type: 'array',
      group: 'homepage',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      validation: Rule => Rule.max(8),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      description: 'Ảnh nền lớn trên trang chủ',
      type: 'image',
      group: 'homepage',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Image URL (fallback)',
      description: 'Dùng nếu chưa upload hero image',
      type: 'url',
      group: 'homepage',
    }),

    // ── Navbar ───────────────────────────────────────────────────────────────
    defineField({
      name: 'navLeft',
      title: 'Menu trái',
      description: 'Các link bên trái navbar (shop, collections, custom…)',
      type: 'array',
      group: 'nav',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Tên hiển thị', type: 'string', validation: R => R.required()}),
          defineField({name: 'href',  title: 'Đường dẫn',    type: 'string'}),
        ],
        preview: {select: {title: 'label', subtitle: 'href'}},
      }],
    }),
    defineField({
      name: 'navRight',
      title: 'Menu phải',
      description: 'Các link bên phải navbar (instagram, about…)',
      type: 'array',
      group: 'nav',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'label',    title: 'Tên hiển thị', type: 'string', validation: R => R.required()}),
          defineField({name: 'href',     title: 'Đường dẫn',    type: 'string'}),
          defineField({name: 'external', title: 'Mở tab mới',   type: 'boolean', initialValue: false}),
        ],
        preview: {select: {title: 'label', subtitle: 'href'}},
      }],
    }),

    // ── Footer ───────────────────────────────────────────────────────────────
    defineField({
      name: 'footerLinks',
      title: 'Links footer',
      description: 'Các link hiển thị ở cuối trang',
      type: 'array',
      group: 'footer',
      of: [{
        type: 'object',
        fields: [
          defineField({name: 'label', title: 'Tên hiển thị', type: 'string', validation: R => R.required()}),
          defineField({name: 'href',  title: 'Đường dẫn',    type: 'string'}),
        ],
        preview: {select: {title: 'label', subtitle: 'href'}},
      }],
    }),

    // ── Policies ─────────────────────────────────────────────────────────────
    defineField({
      name: 'policyRefund',
      title: 'Chính sách hoàn trả',
      description: 'Dùng dấu "- " đầu dòng để tạo danh sách. Ngăn cách đoạn bằng dòng trống.',
      type: 'text', rows: 10, group: 'policies',
    }),
    defineField({
      name: 'policyShipping',
      title: 'Chính sách vận chuyển',
      type: 'text', rows: 10, group: 'policies',
    }),
    defineField({
      name: 'policyPrivacy',
      title: 'Chính sách bảo mật',
      type: 'text', rows: 10, group: 'policies',
    }),
    defineField({
      name: 'policyTerms',
      title: 'Điều khoản dịch vụ',
      type: 'text', rows: 10, group: 'policies',
    }),
    defineField({
      name: 'policyContact',
      title: 'Liên hệ',
      type: 'text', rows: 6, group: 'policies',
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
