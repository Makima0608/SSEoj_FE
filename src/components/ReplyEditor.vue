<template>
    <div style="overflow: hidden">
        <editor v-model="myValue" :init="init" :enabled="enabled" :id="tinymceId"></editor>
    </div>
</template>

<script setup>
import tinymce from "tinymce/tinymce";
import "tinymce/icons/default/icons"
import Editor from "@tinymce/tinymce-vue";
import "tinymce/models/dom"; 
import "tinymce/themes/silver"
import "tinymce/plugins/emoticons"
import "tinymce/plugins/emoticons/js/emojis.js"
import { onMounted, ref } from "vue";

const myValue = ref('')
const init = ref({
    language_url: "/tinymce/langs/zh_CN.js",
    skin_url: "/tinymce/skins/ui/oxide",
    content_css: "/tinymce/skins/content/default/content.css",
    language: "zh_CN",
    branding: false,
    menubar: false,
    toolbar: "emoticons",
    plugins: "emoticons",
    license_key: "gpl",
    paste_data_images: false,
    statusbar: false,
    height: 200,
    content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }p {margin:3px; line-height:24px;}",
    placeholder: "请输入内容..."
})

const tinymceId = ref(
    "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "")
)

const handleGetContent = () => {
    return tinymce.activeEditor.getContent();
};

onMounted(() => {
    tinymce.init({})
})

defineExpose({
    handleGetContent
})

</script>