const suhuValue = document.getElementById('suhu-value');
const kelembabanValue = document.getElementById('kelembaban-value');
const greeting = document.getElementById('greeting');

const suhuData = [24.5, 26.8, 28.2, 30.1, 32.0, 29.5];
const kelembabanData = [55, 60, 65, 70, 75, 80];

function ambilDataSensor() {
    const suhu = suhuData[Math.floor(Math.random() * suhuData.length)];
    const kelembaban = kelembabanData[Math.floor(Math.random() * kelembabanData.length)];

    suhuValue.textContent = suhu + "°C";
    kelembabanValue.textContent = kelembaban + "%";

    [suhuValue, kelembabanValue].forEach(el => {
        el.parentElement.style.opacity = '0';
        el.parentElement.style.transform = 'translateY(10px)';
        setTimeout(() => {
            el.parentElement.style.opacity = '1';
            el.parentElement.style.transform = 'translateY(0)';
        }, 100);
    });
}

function formatTanggal() {
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                   'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const sekarang = new Date();
    const namaHari = hari[sekarang.getDay()];
    const tgl = sekarang.getDate();
    const bln = bulan[sekarang.getMonth()];
    const thn = sekarang.getFullYear();

    return `${namaHari}, ${tgl} ${bln} ${thn}`;
}

function updateGreeting() {
    const hour = new Date().getHours();
    let salam = "";

    if (hour >= 5 && hour < 11) salam = "Selamat pagi!";
    else if (hour >= 11 && hour < 15) salam = "Selamat siang!";
    else if (hour >= 15 && hour < 18) salam = "Selamat sore!";
    else salam = "Selamat malam";

    const tanggal = formatTanggal();
    greeting.innerHTML = `${salam}<br><small>${tanggal}</small>`;
}

window.addEventListener('load', () => {
    updateGreeting();
    ambilDataSensor();

    setInterval(updateGreeting, 60000);

    setInterval(ambilDataSensor, 5000);
});