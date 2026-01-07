const guruForm = document.getElementById("guruForm");
const guruTable = document.getElementById("guruTable");

let guruData = JSON.parse(localStorage.getItem("guru")) || [];
let editGuruIndex = null;

function renderGuru(){
  guruTable.innerHTML = "";
  guruData.forEach((g, i) => {
    guruTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td><img src="${g.foto}"></td>
        <td>${g.nama}</td>
        <td>${g.mapel}</td>   
        <td>
          <button onclick="editGuru(${i})">Edit</button>
          <button onclick="hapusGuru(${i})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

guruForm.addEventListener("submit", e => {
  e.preventDefault();

  const reader = new FileReader();
  reader.onload = () => {
    const data = {
      nama: namaGuru.value,
      mapel: mapelGuru.value,
      foto: reader.result
    };

    if(editGuruIndex !== null){
      guruData[editGuruIndex] = data;
      editGuruIndex = null;
    }else{
      guruData.push(data);
    }

    localStorage.setItem("guru", JSON.stringify(guruData));
    guruForm.reset();
    renderGuru();
  };

  if(fotoGuru.files.length){
    reader.readAsDataURL(fotoGuru.files[0]);
  }else{
    reader.onload();
  }
});

function editGuru(index){
  const g = guruData[index];
  namaGuru.value = g.nama;
  mapelGuru.value = g.mapel;
  editGuruIndex = index;
}

function hapusGuru(index){
  if(confirm("Hapus data guru?")){
    guruData.splice(index,1);
    localStorage.setItem("guru", JSON.stringify(guruData));
    renderGuru();
  }
}

renderGuru();
