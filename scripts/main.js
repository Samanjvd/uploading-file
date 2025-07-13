const fileUploadingLabel = document.querySelector(".file-uploading-label");
const fileInput = document.querySelector(".file-input");
const dropHere = document.querySelector(".drop-here");
const listUl = document.querySelector(".file-list");

const maxSize = 25; // Mb

fileUploadingLabel.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", () => {
  [...fileInput.files].forEach((file) => {
    if (typeValidation(file.type)) {
      uploadFile(file);
    }
  });
});

function uploadFile(file) {
  const fileSizeMB = Math.round((file.size / 1024 / 1024) * 100) / 100;
  const fileName = file.name;
  const fileSizeText = `${fileSizeMB} Mb`;

  if (fileSizeMB > maxSize) {
    alert("Your file size is greater than the specified Maximum Size...!");
    return;
  }

  const li = document.createElement("li");
  li.className = "list-item";

  let chooseIcon;
  switch (file.type) {
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      chooseIcon = "./icons/xls-file.png";
      break;
    case "application/pdf":
      chooseIcon = "./icons/pdf.png";
      break;
    case "image/jpeg":
    case "image/png":
      chooseIcon = "./icons/img.png";
      break;
    case "video/mp4":
      chooseIcon = "./icons/video.png";
      break;
    default:
      chooseIcon = "./icons/icons8-no-access-48.png";
      break;
  }

  li.innerHTML = `
    <div class="left-item">
      <img src="${chooseIcon}" alt="Icon" width="40" height="40" />
      <span class="span-detail">
        <div class="text-top-progress">
          <span class="name">${fileName}</span>
          <span class="progress-percentage">100%</span>
        </div>
        <div class="file-progress">
          <span style="width: 100%;"></span>
        </div>
        <span class="file-size">${fileSizeText}</span>
      </span>
    </div>
    <ion-icon class="checkmark" name="checkmark-circle-sharp"></ion-icon>
    <ion-icon class="close" name="close-circle-sharp"></ion-icon>
  `;

  listUl.appendChild(li);
}

function typeValidation(type) {
  const allowedTypes = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/pdf",
    "image/jpeg",
    "image/png",
    "video/mp4",
  ];

  const isValid = allowedTypes.includes(type);

  if (!isValid) {
    alert(`Unsupported file type: ${type}`);
  }

  return isValid;
}

// Drag and Drop

let dragCounter = 0;

fileUploadingLabel.addEventListener("dragenter", (e) => {
  e.preventDefault();
  dragCounter++;
  fileUploadingLabel.classList.add("drag-over");
});

fileUploadingLabel.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dragCounter--;
  if (dragCounter === 0) {
    fileUploadingLabel.classList.remove("drag-over");
  }
});

fileUploadingLabel.addEventListener("dragover", (e) => {
  e.preventDefault();
});

fileUploadingLabel.addEventListener("drop", (e) => {
  e.preventDefault();
  dragCounter = 0;
  fileUploadingLabel.classList.remove("drag-over");

  [...e.dataTransfer.files].forEach((file) => {
    if (typeValidation(file.type)) {
      uploadFile(file);
    }
  });
});

// Remove File on Icon Click
listUl.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    const li = e.target.closest("li");
    if (li) li.remove();
  }
});
