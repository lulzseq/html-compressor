const codeInput = document.getElementById('code-input');
const compressBtn = document.getElementById('button');

let history = [];

function compressHtml(code) {
  return code
    .replace(/\s*([{}/>])\s*/g, '$1')
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/g, (match, s) => `<style>${s.replace(/\s*([,:;])\s*/g, '$1')}</style>`)
    .replace(/style\s*=\s*"\s*([^"]*?)\s*"/g, (match, s) => `style="${s.replace(/\s*([,:;])\s*/g, '$1')}"`);
}

compressBtn.addEventListener('click', () => {
  history.push(codeInput.value);
  const compressedCode = compressHtml(codeInput.value);
  codeInput.value = compressedCode;
  codeInput.select();
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey && e.key === 'c') || (e.metaKey && e.key === 'c')) {
    if (codeInput.value.length > 0 && codeInput.selectionStart !== codeInput.selectionEnd) {
      const notification = document.createElement('div');
      notification.classList.add('alert', 'alert-success');
      notification.textContent = 'Copied to clipboard';
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 1500);
    }
  } else if ((e.ctrlKey && e.key === 'z') || (e.metaKey && e.key === 'z')) {
    if (history.length > 0) {
      codeInput.value = history.pop();
      codeInput.select();
    }
  } else if ((e.ctrlKey && e.key === 'Enter') || (e.metaKey && e.key === 'Enter')) {
    compressBtn.click();
  }
});