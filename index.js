const qrButton = document.querySelector('.qr-code');
const homeButton = document.querySelector('.qrpage-container .title')
const qrPage = document.querySelector('.qrpage-container');
const qrHome = document.querySelector('.home-container');
const page = document.querySelector('input');
const imageQR = document.getElementById('qrcode');



qrButton.addEventListener('click', () => {
  if(page.value === '') {
    document.querySelector('.message').innerHTML = 'Please write the URL'
  } else {
    qrImage();
    qrHome.style.display = 'none';
    qrPage.style.display = 'inherit';
    document.querySelector('.message').innerHTML = '';
  }
});

homeButton.addEventListener('click', () => {
  qrHome.style.display = 'inherit';
  qrPage.style.display = 'none';
  removeQRimage();
  page.value = '';
});

const removeQRimage = () => {
  while (imageQR.firstChild) {
    imageQR.removeChild(imageQR.firstChild)
  }
}

const qrImage = (e) => {
  //e.preventDefault();
  if(page.value === '') return;

  const qrcode = new QRCode(imageQR, {
    text: page.value,
    width: 250,
    height: 250,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});
}

const qrDownload = () => {
  const link = document.createElement('a');
  const urlImage = document.querySelector('.qrpage-container #qrcode img').src;
  link.href = urlImage;
  link.download = 'QRCode.png';
  document.body.appendChild(link);
  link.click();
  document.removeChild(link);
}

const setToClipboard = async blob => {
  const data = [new ClipboardItem({ [blob.type]: blob })]

  try {
      await navigator.clipboard.write(data)
  }
  catch (error) {
      console.error(error)
  }
}

const qrShare = async () => {
  const urlImage = document.querySelector('.qrpage-container #qrcode img').src
  const response = await fetch(urlImage)
  const blob = await response.blob()
  await setToClipboard(blob)

  // disable button for 2 seconds
  document.querySelector(".qrpage-container .share").disabled = true
  setTimeout(() => {
    document.querySelector(".qrpage-container .share").disabled = false
  }, 2000)
}



document.querySelector('.share').addEventListener('click', qrShare);
document.querySelector('.download').addEventListener('click', qrDownload);