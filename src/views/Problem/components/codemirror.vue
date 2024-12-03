<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <div ref="editorContainer" class="editor"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { Compartment, EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

import { basicSetup } from 'codemirror';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { vscodeLight } from '@uiw/codemirror-theme-vscode';
import { autocompletion } from '@codemirror/autocomplete';

const editorContainer = ref(null);
let editorView = null;
const languageCpt = new Compartment()

const customCompletionSource = async (context) => {
  const word = context.matchBefore(/([a-zA-Z]\w*)/);
  console.log("1:", word)
  if (!word || word.length < 1) {
    return null;
  }

  // 获取当前编辑器的内容
  const state = context.state;
  const variables = getVariablesFromContext(state);

  // 返回符合条件的补全项
  return {
    from: word.from,
    to: word.to,
    options: variables.filter(variables => variables != word.text)
      .map(variable => ({
        label: variable,
        type: "variable"
      }))
  };
};

// 获取当前编辑器中的变量（此处使用简单的正则来提取变量）
function getVariablesFromContext(state) {
  const text = state.doc.toString();
  const variableRegex = /\b([a-zA-Z]\w*)\b/g;  // 正则表达式匹配变量
  let variables = [];
  let match;

  // 排除重复变量名
  while ((match = variableRegex.exec(text)) !== null) {
    if (!variables.includes(match[1]))
      variables.push(match[1]);
  }
  return variables;
}

onMounted(() => {

  // 在组件挂载后初始化 CodeMirror 编辑器
  const startState = EditorState.create({
    doc: "",
    extensions: [vscodeLight,
      keymap.of(defaultKeymap),
      basicSetup,
      languageCpt.of(cpp()),
      autocompletion({override:[customCompletionSource]})]  // 启用默认的键盘快捷键
  });

  editorView = new EditorView({
    state: startState,
    parent: editorContainer.value  // 将编辑器挂载到 DOM 容器上
  });
});
const langs = {
  'C': cpp(),
  'C++': cpp(),
  'Java': java(),
  'Python': python()
}

// 修改语言
const toggleLanguage = (lang) => {
  const newLang = langs[lang]
  if (!newLang) {
    console.log('no match language')
    return
  }
  editorView.dispatch({
    effects: languageCpt.reconfigure(newLang)
  });
}

const uploadCode = (code) => {
  const transaction = editorView.state.update({
    changes: { from: 0, to: editorView.state.doc.length, insert: code }
  });

  editorView.dispatch(transaction);
}

defineExpose({
  toggleLanguage,
  uploadCode
})
</script>

<style scoped>
.editor:active {
  text-decoration: none;
}
</style>