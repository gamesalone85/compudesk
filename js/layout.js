function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");
function trackClick(red) {
    console.log("Click en:", red);
}
