const fileUploadingLabel = document.querySelector(".file-uploading-label");
const fileInput = document.querySelector(".file-input");
const dropSection = document.querySelector(".page-drag-browse");
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

    switch (file.type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        li.innerHTML = ` <li class="list-item">
              <div class="left-item">
                <img
                  src="./icons/xls.png"
                  alt="XLS,XLSX"
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
        break;
      case "application/pdf":
        li.innerHTML = ` <li class="list-item">
              <div class="left-item">
                <img
                  src="./icons/pdf (1).png"
                  alt="application/pdf"
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
        break;
      case "image/jpeg":
        li.innerHTML = ` <li class="list-item">
              <div class="left-item">
                <img
                  src="./icons/image.png"
                  alt="image/jpeg"
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
        break;
      case "video/mp4":
        li.innerHTML = ` <li class="list-item">
              <div class="left-item">
                <img
                  src="./icons/video.png"
                  alt="video/mp4"
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
        break;

      default:
        alert("Error : file Type not define...!");
        break;
    }

    listUl.appendChild(li); //append inner element HTML
  }

  // let i = 0;
  // let intervalId = 0;

  // setInterval(() => {
  //   intervalId = i;
  //   i += 10;
  //   if (i > 100) {
  //     clearInterval(intervalId);
  //   }
  // }, 1000); // print numbers every 1 second
  // console.log("i = " + i);
  // console.log(intervalId); // [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
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

// if (e.dataTransfer.items) {
//   [...e.dataTransfer.items].forEach((item) => {
//     if (item.kind === "file") {
//       // const file = item.getAsfile();
//       if (typeValidation(item.type)) {
//         uploadFile(item);
//       }
//     }
//   });
// } else {
//   [...e.dataTransfer.files].forEach((file) => {
//     if (typeValidation(file.type)) {
//       uploadFile(file);
//     }
//   });
// }
