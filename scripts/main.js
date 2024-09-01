const fileUploadingLabel = document.querySelector(".file-uploading-label");
const fileInput = document.querySelector(".file-input");
// const dropSection = document.querySelector(".page-drag-browse");
const dropHere = document.querySelector(".drop-here");
const listUl = document.querySelector(".file-list");

fileUploadingLabel.addEventListener("click", () => {
  fileInput.click();
});

let maxSize = 25;

fileInput.addEventListener("change", () => {
  [...fileInput.files].forEach(function (file) {
    if (typeValidation(file.type)) {
      uploadFile(file);
    }
  });
});

function uploadFile(file) {
  let numSize = Math.round((file.size / 1024 / 1024) * 100) / 100;
  let fileName = file.name;
  let fileSize = numSize + " Mb";

  if (numSize > maxSize) {
    alert("Your file size is greater than the specified Maximum Size...!");
  } else {
    let li = document.createElement("li");
    let chooseIcon;

    switch (file.type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        chooseIcon = "./icons/xls-file.png";
        break;
      case "application/pdf":
        chooseIcon = "./icons/pdf.png";
        break;
      case "image/jpeg":
        chooseIcon = "./icons/img.png";
        break;
      case "video/mp4":
        chooseIcon = "./icons/video.png";
        break;

      default:
        chooseIcon = "./icons/icons8-no-access-48.png";
        break;
    }

    li.innerHTML = ` <li class="list-item">
              <div class="left-item">
                <img
                  src=${chooseIcon}
                  alt="Icon"
                  width="40"
                  height="40"
                />
                <span class="span-detail">
                  <div class="text-top-progress">
                    <span class="name">${fileName}</span>
                    <span class="progress-percentage">%</span>
                  </div>
                  <div class="file-progress">
                    <span style="width: %;"></span>
                  </div>
                  <span class="file-size">${fileSize}</span>
                </span>
              </div>
              <ion-icon
                class="checkmark"
                name="checkmark-circle-sharp"
              ></ion-icon>
              <ion-icon class="close" name="close-circle-sharp"></ion-icon>
            </li>`;

    listUl.appendChild(li); //append inner element HTML
  }
}

function typeValidation(type) {
  let splitType = type.split("/")[0];

  if (
    type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    type == "application/pdf" ||
    type == "image/jpeg" ||
    type == "video/mp4"
  ) {
    return true;
  } else {
    alert("Error : no define type file");
  }
}

fileUploadingLabel.addEventListener("dragover", (e) => {
  e.preventDefault();
  [...e.dataTransfer.items].forEach((item) => {
    if (typeValidation(item.type)) {
      fileUploadingLabel.classList.add("drag-over");
    }
  });
});

fileUploadingLabel.addEventListener("dragleave", () => {
  fileUploadingLabel.classList.remove("drag-over");
});

fileUploadingLabel.addEventListener("drop", (e) => {
  e.preventDefault();
  fileUploadingLabel.classList.remove("drag-over");
  [...e.dataTransfer.files].forEach((file) => {
    if (typeValidation(file.type)) {
      uploadFile(file);
    }
  });
});
