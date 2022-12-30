function resize(img) {
    let preview = document.getElementById('preview');
    let canvas = document.createElement('canvas');

    let width = img.width;
    let height = img.height;

    let max_width = 800;

    if (width > max_width) {
        height *= (max_width / width)
        width = max_width;
    }

    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);


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
    let resized

    reader.onloadend = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function () {
            resized = resize(img);
            setImage(resized);
        }
    };
};