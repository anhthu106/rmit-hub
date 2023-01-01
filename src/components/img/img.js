function resize(img) {
  const preview = document.getElementById("preview");
  const canvas = document.createElement("canvas");

  const imageResizeWidth = 300; //<- change this value to change default width resize :>

  canvas.width = imageResizeWidth;
  canvas.height = ~~(img.height * (imageResizeWidth / img.width));

  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  if (preview.childElementCount == 0) {
    preview.appendChild(canvas);
  } else {
    preview.removeChild(preview.firstChild);
    preview.appendChild(canvas);
  }

  return canvas.toDataURL("image/jpeg", 1);
}

export default function setFileToBase(file, setImage) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  let resized;

  reader.onloadend = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = function () {
      resized = resize(img);
      setImage(resized);
    };
  };
}
