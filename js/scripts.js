async function validatePlate() {
    const plateInput = document.getElementById("plate");
    const plateInfo = document.getElementById("plate-info");
    let plate = plateInput.value.toUpperCase().trim();


    const plateRegex = /^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;

    if (!plate) {
        plateInfo.innerHTML = "Por favor, digite uma placa.";
        return;
    }

    if (!plateRegex.test(plate)) {
        plateInfo.innerHTML = "Placa inválida! Use um formato válido: AAA-0000 ou ABC1D23.";
        return;
    }

    plate = plate.replace("-", "");

    try {
        const response = await fetch(`https://brasilapi.com.br/api/placa/v1/${plate}`);
        if (!response.ok) {
            throw new Error("Erro ao validar a placa");
        }
        const data = await response.json();

        if (data.placa) {
            plateInfo.innerHTML = `✅ Placa válida: ${data.placa} - Modelo: ${data.modelo}`;
        } else {
            plateInfo.innerHTML = "❌ Placa não encontrada.";
        }
    } catch (error) {
        plateInfo.innerHTML = `✅ Placa válida (simulação): ${plate} - Modelo: SUV (Simulado)`;
    }
}

// Função de cálculo de preço
function calculatePrice() {
    const plate = document.getElementById("plate").value.toUpperCase().trim();
    const typeSelect = document.getElementById("type").value;
    const isElectric = document.getElementById("isElectric").checked;
    const hours = parseInt(document.getElementById("hours").value, 10);

    if (!plate) {
        alert("Por favor, valide a placa antes de calcular o preço.");
        return;
    }

    const [vehicleType, price] = typeSelect.split("-").map(item => item.trim());
    let totalPrice = parseFloat(price) * hours;

    if (isElectric) {
        totalPrice *= 0.5;
    }

    totalPrice = totalPrice.toFixed(2);

    document.getElementById("total-price").innerHTML = `
        <strong>Placa:</strong> ${plate} <br>
        <strong>Tipo:</strong> ${vehicleType} ${isElectric ? "(Elétrico)" : ""} <br>
        <strong>Total:</strong> R$${totalPrice}
    `;
}

// Splash screen
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".splash").classList.add("hidden");
    }, 2000);
});
