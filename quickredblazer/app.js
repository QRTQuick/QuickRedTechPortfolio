const DEFAULT_FILES = {
  'index.html': `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>QuickRedBlazer Preview</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hello from QuickRedBlazer Preview</h1>
    <p>Edit the files and click Run to update this preview.</p>
    <script src="script.js"></script>
  </body>
</html>` ,
  'styles.css': `body{font-family:Inter,Arial,sans-serif;background:#0a0a0a;color:#fff;padding:24px}h1{color:#ff2b2b}`,
  'script.js': `console.log('QuickRedBlazer preview running')`
}

const KEY = 'qrb_files'
let files = JSON.parse(localStorage.getItem(KEY) || 'null') || DEFAULT_FILES
let current = 'index.html'

const editor = document.getElementById('editor')
const preview = document.getElementById('preview')
const currentLabel = document.getElementById('current-file')
const fileButtons = document.querySelectorAll('.qrb-files button')

function loadFile(name){
  current = name
  currentLabel.textContent = name
  editor.value = files[name] || ''
  fileButtons.forEach(b=>b.classList.toggle('active', b.dataset.file === name))
}

function saveFiles(){ localStorage.setItem(KEY, JSON.stringify(files)); flashSave() }
function flashSave(){ const btn = document.getElementById('btn-save'); btn.textContent='Saved'; setTimeout(()=>btn.textContent='Save',900)}

function runPreview(){
  let html = files['index.html'] || ''
  html = html.replace(/<link[^>]*href=["']styles\.css["'][^>]*>/, `<style>${files['styles.css']||''}</style>`)
  html = html.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/, `<script>${files['script.js']||''}<\/script>`)
  preview.srcdoc = html
}

document.getElementById('btn-run').addEventListener('click', runPreview)
document.getElementById('btn-save').addEventListener('click', saveFiles)

fileButtons.forEach(b=>{
  b.addEventListener('click', ()=> loadFile(b.dataset.file))
})

editor.addEventListener('input', ()=>{ files[current] = editor.value })

// toggle editor/preview on mobile
document.getElementById('toggle-editor').addEventListener('click', ()=>{
  document.getElementById('editor').style.display = 'block'
  document.getElementById('preview-wrap').style.display = 'none'
  document.getElementById('toggle-editor').classList.add('active')
  document.getElementById('toggle-preview').classList.remove('active')
})
document.getElementById('toggle-preview').addEventListener('click', ()=>{
  document.getElementById('editor').style.display = 'none'
  document.getElementById('preview-wrap').style.display = 'block'
  document.getElementById('toggle-preview').classList.add('active')
  document.getElementById('toggle-editor').classList.remove('active')
  runPreview()
})

// init
loadFile('index.html')
runPreview()
