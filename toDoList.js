const toDoInputDOM = document.querySelector("#toDoInput");
const toDoInputBtn = document.querySelector("#toDoInputBtn");
const ulDOM = document.querySelector("#toDoList");
const bodyDOM = document.querySelector("body");
ulDOM.classList.add("list-none");

toDoInputBtn.addEventListener("click", addContext);
ulDOM.addEventListener("click", removeContext);

const alertFunction = (iconType, message, img, className) =>
  `<div class=" ${className}" role="alert">
<div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
    ${img}
    <span class="sr-only">${iconType} icon</span>
</div>
<div class="ml-3 text-sm font-normal">${message}</div>

</div>`;

function addContext(event) {
  event.preventDefault();
  const liDOM = document.createElement("li");
  const index = ulDOM.children.length;
  const iconSpan = document.createElement("span");
  if (toDoInputDOM.value.trim() == "") {
    const toastHTML = alertFunction(
      "Error",
      "Boş Bırakılmaz.",
      `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
            </svg>`,
      "alert absolute top-0 right-0 mt-2 flex items-center bg-opacity-75 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    );

    const toastContainer = document.createElement("div");
    toastContainer.innerHTML = toastHTML;
    bodyDOM.appendChild(toastContainer);

    setTimeout(() => {
      toastContainer.remove();
    }, 2000);
  } else {
    const toastHTML = alertFunction(
      "Check",
      "Başarıyla Eklendi.",
      `<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>`,
      "alert absolute top-0 right-0 mt-2 flex items-center bg-opacity-75 max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
    );

    iconSpan.innerHTML = "&#x2716;";
    iconSpan.classList.add(
      "close",
      "float-right",
      "justify-center",
      "cursor-pointer",
      "hover:bg-red-500",
      "p-1"
    );
    liDOM.innerHTML = toDoInputDOM.value;

    liDOM.appendChild(iconSpan);
    ulDOM.appendChild(liDOM);
    toDoInputDOM.value = "";

    if (index % 2 === 0) {
      liDOM.classList.add(
        "toDoItem",
        "bg-gray-100",
        "hover:bg-gray-500",
        "pl-6",
        "pb-2"
      );
    } else {
      liDOM.classList.add(
        "toDoItem",
        "bg-gray-200",
        "hover:bg-gray-500",
        "pl-6",
        "pb-2"
      );
    }
    const toastContainer = document.createElement("div");
    toastContainer.innerHTML = toastHTML;
    bodyDOM.appendChild(toastContainer);

    setTimeout(() => {
      toastContainer.remove();
    }, 2000);
  }
}

function removeContext(event) {
  if (event.target.classList.contains("close")) {
    const listItem = event.target.closest("li");
    if (listItem) {
      listItem.remove();
    }
  }
  if (event.target.classList.contains("toDoItem")) {
    const listItem = event.target.closest("li");
    const iconSpan = document.createElement("span");
    if (listItem) {
      if (listItem.classList.contains("line-through")) {
        const iconSpan = listItem.querySelector(".tick");
        listItem.classList.remove("line-through", "bg-gray-500");
        listItem.classList.add("pl-6");
        if (iconSpan) {
          iconSpan.remove();
        }
      } else {
        listItem.classList.add("line-through", "bg-gray-500");
        listItem.classList.remove("pl-6");
        iconSpan.classList.add("tick", "float-left", "pr-3");
        iconSpan.innerHTML = "\u2713";
        listItem.appendChild(iconSpan);
      }
    }
  }
}
