function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    
    // Panggilan API login
    fetch('https://ets-pemrograman-web-f.cyclic.app/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        // Periksa respons dari API
        if (data.success) {
            startGame();

        } else {
            // login gagal, tampilkan pesan kesalahan kepada pengguna.
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Kesalahan saat melakukan panggilan API:', error);
    });
}

function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Validasi email
    if (!isValidEmail(email)) {
        alert("Email tidak valid. Pastikan email memiliki format yang benar.");
        return;
    }

    // Validasi password
    if (!isStrongPassword(password)) {
        alert("Password tidak memenuhi kriteria keamanan.");
        return;
    }

    fetch('https://ets-pemrograman-web-f.cyclic.app/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Gagal registrasi');
          }
          return response.json();
        })
        .then(data => {
          // Proses data yang diterima setelah registrasi berhasil
          console.log(data);
        })
        .catch(error => {
          console.error(error);
          // Handle kesalahan registrasi
        });
}

// Fungsi untuk memeriksa validitas email
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// Fungsi untuk memeriksa kriteria keamanan password
function isStrongPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}



// function displayTop3HighScores() {
//     // Lakukan panggilan API untuk mengambil data high score
//     fetch('https://ets-pemrograman-web-f.cyclic.app/scores/score')
//         .then(response => response.json())
//         .then(data => {
//             // Urutkan data skor dari tertinggi ke terendah
//             data.sort((a, b) => b.score - a.score);

//             // Ambil 3 skor tertinggi
//             const top3Scores = data.slice(0, 3);

//             // Tampilkan 3 skor tertinggi di antarmuka pengguna
//             const scoreList = document.getElementById('scoreList');
//             scoreList.innerHTML = ''; // Hapus konten sebelumnya

//             top3Scores.forEach((score, index) => {
//                 const li = document.createElement('li');
//                 li.textContent = `Pemain: ${score.player}, Skor: ${score.score}`;
//                 scoreList.appendChild(li);
//             });
//         })
//         .catch(error => {
//             console.error('Kesalahan saat mengambil data high score:', error);
//         });
// }
