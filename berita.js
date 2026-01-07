const beritaForm = document.getElementById("beritaForm");
const beritaList = document.getElementById("beritaList");

let beritaData = JSON.parse(localStorage.getItem("berita")) || [];

function renderBerita() {
  beritaList.innerHTML = "";

  beritaData.forEach((b, i) => {
    beritaList.innerHTML += `
      <div class="berita-card">
        <img src="${b.foto}" alt="Foto Berita">
        <div class="berita-content">
          <h3>${b.judul}</h3>
          <small>${b.tanggal}</small>
          <p>${b.isi}</p>
          <button onclick="hapusBerita(${i})">Hapus</button>
        </div>
      </div>
    `;
  });
}


beritaForm.addEventListener("submit", e => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = () => {
    beritaData.push({
      judul: judulBerita.value,
      isi: isiBerita.value,
      foto: reader.result,
      tanggal: new Date().toLocaleDateString()
    });
    localStorage.setItem("berita", JSON.stringify(beritaData));
    renderBerita();
    beritaForm.reset();
  };
  reader.readAsDataURL(fotoBerita.files[0]);
});

function hapusBerita(i) {
  beritaData.splice(i, 1);
  localStorage.setItem("berita", JSON.stringify(beritaData));
  renderBerita();
}

renderBerita();