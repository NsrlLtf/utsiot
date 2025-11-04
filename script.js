// Update Jam Indonesia
function updateDate() {
  const days = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  const now = new Date();
  const str = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  document.getElementById('date').textContent = str;
}
updateDate();
setInterval(updateDate, 60000);

// MQTT WebSocket
const client = mqtt.connect('wss://broker.hivemq.com:8084/mqtt');

client.on('connect', () => {
  document.getElementById('conn').textContent = 'Online';
  document.getElementById('conn').className = 'online';
  client.subscribe('iot/suhu');
  client.subscribe('iot/kelembaban');
});

client.on('message', (topic, message) => {
  const val = parseFloat(message.toString()).toFixed(1);

  if (topic === 'iot/suhu') {
    document.getElementById('suhu').textContent = val + '°C';
    const st = document.getElementById('suhu-status');
    if (val > 30) { st.textContent = 'Suhu Tinggi'; st.className = 'status warning'; }
    else if (val < 20) { st.textContent = 'Suhu Rendah'; st.className = 'status danger'; }
    else { st.textContent = 'Suhu Normal'; st.className = 'status normal'; }
  }

  if (topic === 'iot/kelembaban') {
    document.getElementById('kelembaban').textContent = val + '%';
    const st = document.getElementById('kelembaban-status');
    if (val > 70) { st.textContent = 'Kelembaban Tinggi'; st.className = 'status warning'; }
    else if (val < 40) { st.textContent = 'Kelembaban Rendah'; st.className = 'status danger'; }
    else { st.textContent = 'Kelembaban Normal'; st.className = 'status normal'; }
  }
});

client.on('offline', () => {
  document.getElementById('conn').textContent = 'Offline';
  document.getElementById('conn').className = 'offline';
});