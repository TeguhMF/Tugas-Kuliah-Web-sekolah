const siswaForm = document.getElementById("siswaForm");
const siswaTable = document.getElementById("siswaTable");

let siswaData = JSON.parse(localStorage.getItem("siswa")) || [];
let editSiswaIndex = null;

function renderSiswa(){
  siswaTable.innerHTML = "";
  siswaData.forEach((s, i) => {
    siswaTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td><img src="${s.foto}"></td>
        <td>${s.nama}</td>
        <td>${s.kelas}</td>
        <td>${s.nip}</td>
        <td>
          <button onclick="editSiswa(${i})">Edit</button>
          <button onclick="hapusSiswa(${i})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

siswaForm.addEventListener("submit", e => {
  e.preventDefault();

  const reader = new FileReader();
  reader.onload = () => {
    const data = {
      nama: namaSiswa.value,
      kelas: kelasSiswa.value,
      nip: nipSiswa.value,
      foto: reader.result
    };

    if(editSiswaIndex !== null){
      siswaData[editSiswaIndex] = data;
      editSiswaIndex = null;
    }else{
      siswaData.push(data);
    }

    localStorage.setItem("siswa", JSON.stringify(siswaData));
    siswaForm.reset();
    renderSiswa();
  };

  if(fotoSiswa.files.length){
    reader.readAsDataURL(fotoSiswa.files[0]);
  }else{
    reader.onload();
  }
});

function editSiswa(index){
  const s = siswaData[index];
  namaSiswa.value = s.nama;
  kelasSiswa.value = s.kelas;
  nipSiswa.value = s.nip;
  editSiswaIndex = index;
}

function hapusSiswa(index){
  if(confirm("Hapus data siswa?")){
    siswaData.splice(index,1);
    localStorage.setItem("siswa", JSON.stringify(siswaData));
    renderSiswa();
  }
}

renderSiswa();
