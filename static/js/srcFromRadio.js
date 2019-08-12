function updateGlobal() {
    var emsButton = document.querySelector("#EMSRadio");

    var edButton = document.querySelector("#EDRadio");

    var meButton = document.querySelector("#MERadio");

    if (emsButton.checked){
      globalDataSource = emsButton.value;
    };

    if (edButton.checked){
      globalDataSource = edButton.value;
    };

    if (meButton.checked){
      globalDataSource = meButton.value;
    };
};
