# Soc Room

## 使用技術

這次使用 vite 做開發， UI 框架使用 Tailwind

使用 compensation api 做邏輯拆分

## Coding Style

- Vue 3 Script Setup
- Vue SFC (由上而下排列)
  - script: `<script setup>`
  - template: `<template>`
  - style: `<style scoped>`

## Vite 插件功能

- src/components
  - 此資料夾下的 Component 可以在任何 .vue 檔案中直接使用不需用 import。
  - https://github.com/antfu/vite-plugin-components
- import 自動導入
  - 系統會自動偵測 `.vue.js.ts` 檔，並引入 `vue、vue router、Pinia`
  - https://github.com/antfu/unplugin-auto-import

## 開發

```
# install deps
npm install

# run dev server
npm run dev

# run build
npm run build

```
