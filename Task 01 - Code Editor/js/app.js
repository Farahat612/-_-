var html = document.getElementById('html');
var css = document.getElementById('css');
var js = document.getElementById('js');
var code = document.getElementById('output').contentWindow.document;



function compile() {
  const PREFIX = 'livecode-';
  const data = ['html', 'css', 'js'].map((key) => {
    const prefixedKey = PREFIX + key;
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);
  });
  setInitial(data);
  document.body.onkeyup = function () {
    localStorage.setItem('livecode-html', JSON.stringify(html.value));
    localStorage.setItem('livecode-css', JSON.stringify(css.value));
    localStorage.setItem('livecode-js', JSON.stringify(js.value));
    code.open();
    code.writeln(
      html.value +
        '<style>' +
        css.value +
        '</style>' +
        '<script>' +
        js.value +
        '</script>'
    );
    code.close();
  };
}


function setInitial(data) {
  let htmlContent = data[0] || '<h1>This is just a preview.</h1>';
  let cssContent =
    data[1] ||
    `body {
      background-color: #253237;
     }

     h1 {
      width: 50%;
      color: #fff;
      padding: 5px;
      text-align: center;
      margin: 10% auto;
      border: 1px solid #fff;
     }`;
  let jsContent = data[2] || 'console.log("Welcome to CodMe!")';
  css.value = cssContent;
  js.value = jsContent;
  html.value = htmlContent;
  code.open();
  code.writeln(
    htmlContent +
      '<style>' +
      cssContent +
      '</style>' +
      '<script>' +
      jsContent +
      '</script>'
  );
  code.close();
}

compile();



document.querySelectorAll('.control').forEach((control) =>
  control.addEventListener('click', (e) => {
    e.target.parentElement.parentElement.classList.toggle('collapse');
    e.target.classList.add('close');
    e.target.parentElement.querySelector('h2').classList.toggle('hidden');
  })
);

document.querySelectorAll('.clear').forEach((clear) =>
  clear.addEventListener('click', (e) => {
    const ele = e.target.classList[1];
    document.querySelector(`#${ele}`).value = '';
    localStorage.setItem(`livecode-${ele}`, JSON.stringify(''));
    compile();
  })
);

document.querySelectorAll('.copy-btn').forEach((copy) => {
  copy.addEventListener('click', (e) => {
    const temp = e.target.innerHTML;
    e.target.innerText = 'Copied!';
    setTimeout(function () {
      e.target.innerHTML = temp;
    }, 800);
  });
});

document.querySelector('.copy-html').addEventListener('click', (e) => {
  const code = document.querySelector('#html');
  copyCode(code);
});

document.querySelector('.copy-css').addEventListener('click', (e) => {
  const code = document.querySelector('#css');
  copyCode(code);
});
document.querySelector('.copy-js').addEventListener('click', (e) => {
  const code = document.querySelector('#js');
  copyCode(code);
});

function copyCode(code) {
  code.select();
  document.execCommand('copy');
  swal(
    {
      title: 'Copied!',
      text: 'Code copied to clipboard',
      icon: 'success',
      button: 'Ok',
      closeOnClickOutside: false, // Prevent closing on outside click
      closeOnEsc: false, // Prevent closing on ESC key
      timer: 2000, // Auto-close after 2000 milliseconds (2 seconds)
    }

  );
  }

