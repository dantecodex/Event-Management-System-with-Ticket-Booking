document.addEventListener("DOMContentLoaded", (e) => {
    const dateInput = document.getElementById("floatingDate")

    const today = new Date().toISOString().split('T')[0]
    dateInput.setAttribute('min', today)
})