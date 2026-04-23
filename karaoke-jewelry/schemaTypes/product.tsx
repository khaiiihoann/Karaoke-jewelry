import React from 'react'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',

  groups: [
    {name: 'basic',   title: 'Thông tin cơ bản', default: true},
    {name: 'images',  title: 'Hình ảnh'},
    {name: 'details', title: 'Chi tiết & Bán hàng'},
  ],

  fields: [
    // ── Basic ────────────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Tên sản phẩm',
      type: 'string',
      group: 'basic',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Bông tai',   value: 'Bông tai'},
          {title: 'Dây Chuyền', value: 'Dây Chuyền'},
          {title: 'Nhẫn',       value: 'Nhẫn'},
          {title: 'Vòng Tay',   value: 'Vòng Tay'},
          {title: 'Charm',      value: 'Charm'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Giá (VNĐ)',
      description: 'Nhập số nguyên, ví dụ: 1400000',
      type: 'number',
      group: 'basic',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả sản phẩm',
      description: 'Hiển thị trên trang chi tiết sản phẩm',
      type: 'text',
      rows: 4,
      group: 'basic',
    }),

    // ── Images ───────────────────────────────────────────────────────────────
    defineField({
      name: 'imageA',
      title: 'Hình chính (upload)',
      description: 'Upload hình ảnh trực tiếp — ưu tiên hơn URL bên dưới',
      type: 'image',
      group: 'images',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imageB',
      title: 'Hình hover (upload)',
      description: 'Hiển thị khi hover chuột vào sản phẩm',
      type: 'image',
      group: 'images',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imgA',
      title: 'URL hình chính (cũ)',
      description: 'Dùng nếu chưa upload hình — sẽ được thay bằng hình upload',
      type: 'url',
      group: 'images',
    }),
    defineField({
      name: 'imgB',
      title: 'URL hình hover (cũ)',
      description: 'Dùng nếu chưa upload hình hover',
      type: 'url',
      group: 'images',
    }),

    // ── Details ──────────────────────────────────────────────────────────────
    defineField({
      name: 'sizes',
      title: 'Size có sẵn',
      description: 'Để trống nếu sản phẩm không có size (charm, bông tai…)',
      type: 'array',
      of: [{type: 'string'}],
      group: 'details',
      options: {
        list: [
          {title: 'S', value: 'S'},
          {title: 'M', value: 'M'},
          {title: 'L', value: 'L'},
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'isFeatured',
      title: 'Hiển thị trên trang chủ',
      description: 'Tick để xuất hiện trong mục "Popular" trên homepage',
      type: 'boolean',
      group: 'details',
      initialValue: false,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Thứ tự hiển thị',
      description: 'Số nhỏ hơn = hiển thị trước. Featured products: 1–8',
      type: 'number',
      group: 'details',
      initialValue: 999,
    }),
    defineField({
      name: 'isVisible',
      title: 'Hiển thị trên website',
      description: 'Bỏ tick để ẩn sản phẩm (không xóa)',
      type: 'boolean',
      group: 'details',
      initialValue: true,
    }),
    defineField({
      name: 'productId',
      title: 'Số catalog (tuỳ chọn)',
      description: 'Số tham chiếu nội bộ — không dùng cho URL nữa, để trống cũng được',
      type: 'number',
      group: 'details',
    }),
  ],

  orderings: [
    {
      title: 'Thứ tự hiển thị',
      name: 'sortOrderAsc',
      by: [{field: 'sortOrder', direction: 'asc'}],
    },
    {
      title: 'Tên A→Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],

  preview: {
    select: {
      title:    'name',
      category: 'category',
      price:    'price',
      media:    'imageA',
      imgUrl:   'imgA',
    },
    prepare({title, category, price, media, imgUrl}) {
      const priceStr = price ? price.toLocaleString('vi-VN') + '₫' : '';
      return {
        title:    title || 'Chưa đặt tên',
        subtitle: [category, priceStr].filter(Boolean).join(' · '),
        media:    media || (imgUrl
          ? React.createElement('img', {src: imgUrl, style: {width: '100%', height: '100%', objectFit: 'cover'}})
          : undefined),
      }
    },
  },
})
