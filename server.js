const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('login');
});


app.post('/dashboard', (req, res) => {
    const { username, password } = req.body;
    // Cek kebenaran login, untuk sementara hard-coded
    if (username === 'admin' && password === 'password') {
        res.render('dashboard');
    } else {
        res.send('Login gagal');
    }
});


app.get('/input-penduduk', (req, res) => {
    res.render('input_penduduk');
});


// Array untuk menyimpan data penduduk
let dataPenduduk = [];

// Handler untuk menyimpan data penduduk dari form
app.post('/input-penduduk', (req, res) => {
    const { nik, nama, alamat, tanggal_lahir, golongan_darah, agama, status } = req.body;

    // Simpan data penduduk ke dalam array
    dataPenduduk.push({ nik, nama, alamat, tanggal_lahir, golongan_darah, agama, status });

    // Redirect ke halaman input penduduk untuk input selanjutnya atau menuju halaman lain sesuai kebutuhan
    res.redirect('/input-penduduk');
});


app.get('/kartu-keluarga', (req, res) => {
    // Render halaman kartu keluarga dan kirimkan data penduduk
    res.render('kartu_keluarga', { dataPenduduk });
});


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
