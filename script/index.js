// Fungsi untuk menampilkan list produk
function getProduct() {
  $.getJSON("data/produk.json", function (result) {
    let product = result.produk;

    $.each(product, function (i, data) {
      let diskon = data.diskon;
      let harga = parseInt(data.harga);
      let hargaDiskon = (diskon / 100) * harga;
      let totalHarga = harga - hargaDiskon;
      if (diskon) {
        $("#list-produk").append(`
          <div class="col-6 col-lg-3 mb-3 mb-lg-5">
            <a href="index.html" class="text-decoration-none text-dark detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.nama}">
              <div class="card mt-4 mt-lg-0 shadow">
                <img
                  src="${data.gambar.klub[0]}"
                  class="card-img-top"
                  alt="jersey arsenal home 2022/2023"
                />
                <div class="card-body">
                  <p class="card-text">${data.nama}</p>
                  <h5 class="card-title fw-bold">Rp ${totalHarga}</h5>
                  <span class="d-sm-inline-block bg-warning px-1 me-2 rounded">
                    Diskon ${data.diskon}%
                  </span>
                  <p class="card-text d-inline-block text-decoration-line-through">
                    Rp ${data.harga}
                  </p>
                </div>
                <div class="card-footer">
                  <p class="card-text">
                    <i class="fa-solid fa-star text-warning"></i> ${data.rating} | Terjual
                    ${data.terjual}
                  </p>
                </div>
              </div>
            </a>
          </div>
          `);
      } else {
        $("#list-produk").append(`
          <div class="col-6 col-lg-3 mb-3 mb-lg-5">
            <a href="index.html" class="text-decoration-none text-dark detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.nama}">
              <div class="card mt-4 mt-lg-0 shadow">
                <img
                  src="${data.gambar.klub[0]}"
                  class="card-img-top"
                  alt="jersey arsenal home 2022/2023"
                />
                <div class="card-body">
                  <p class="card-text">${data.nama}</p>
                  <h5 class="card-title fw-bold">Rp ${data.harga}</h5>
                  
                  <p class="card-text d-inline-block">
                    ${data.kota}
                  </p>
                </div>
                <div class="card-footer">
                  <p class="card-text">
                    <i class="fa-solid fa-star text-warning"></i> ${data.rating} | Terjual
                    ${data.terjual}
                  </p>
                </div>
              </div>
            </a>
          </div>
          
          `);
      }
      $("#section-2").hide();
    });
  });
}
getProduct();

$("#selengkapnya").on("click", function () {});

//  Search button
function Search() {
  $.getJSON("data/produk.json", function (result) {
    let input = $("#search-input").val();
    let content = " ";
    let produk = result.produk;
    $.each(produk, function (index, data) {
      let diskon = data.diskon;
      let harga = parseInt(data.harga);
      let hargaDiskon = (diskon / 100) * harga;
      let totalHarga = harga - hargaDiskon;
      if (
        input == data.kategori ||
        input == data.nama ||
        input == data.nama.toLowerCase()
      ) {
        $(".title-produk").html(data.kategori);
        content += `
          <div class="col-6 col-lg-3 mb-3">
            <a href="index.html" class="text-decoration-none text-dark detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.nama}">
              <div class="card mt-4 mt-lg-0 shadow">
                <img
                  src="${data.gambar.klub[0]}"
                  class="card-img-top"
                  alt="jersey arsenal home 2022/2023"
                />
                <div class="card-body">
                  <p class="card-text">${data.nama}</p>
                  <h5 class="card-title fw-bold">Rp ${data.harga}</h5>
                  
                  <p class="card-text d-inline-block">
                    ${data.kota}
                  </p>
                </div>
                <div class="card-footer">
                  <p class="card-text">
                    <i class="fa-solid fa-star text-warning"></i> ${data.rating} | Terjual
                    ${data.terjual}
                  </p>
                </div>
              </div>
            </a>
          </div>
           `;
        $("#list-produk").html(content);
        $("#hero").hide();
        $("#search-input").val("");
        if (diskon) {
          $(".title-produk").html(
            `<img src="${data.gambar.liga}" width="30"> ${data.kategori}</img>`
          );
          content += `
        <div class="col-6 col-lg-3 mb-3 mb-lg-5">
            <a href="index.html" class="text-decoration-none text-dark detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.nama}">
              <div class="card mt-4 mt-lg-0 shadow">
                <img
                  src="${data.gambar.klub[0]}"
                  class="card-img-top"
                  alt="jersey arsenal home 2022/2023"
                />
                <div class="card-body">
                  <p class="card-text">${data.nama}</p>
                  <h5 class="card-title fw-bold">Rp ${totalHarga}</h5>
                  <span class="d-sm-inline-block bg-warning px-1 me-2 rounded">
                    Diskon ${data.diskon}%
                  </span>
                  <p class="card-text d-inline-block text-decoration-line-through">
                    Rp ${data.harga}
                  </p>
                </div>
                <div class="card-footer">
                  <p class="card-text">
                    <i class="fa-solid fa-star text-warning"></i> ${data.rating} | Terjual
                    ${data.terjual}
                  </p>
                </div>
              </div>
            </a>
          </div>
        `;
          $("#list-produk").html(content);
          $("#hero").hide();
        }
      }
    });
  });
}

$("#search-button").on("click", function () {
  Search();
});

//   Klik button kategori pada navbar
$(".dropdown-item").on("click", function () {
  $(".dropdown").removeClass(".active");
  $(".dropdown-item").removeClass(".active");
  $(this).addClass(".active");
  let kategori = $(this).html();
  console.log(kategori);
  $(".title-produk").html(kategori);

  $.getJSON("data/produk.json", function (result) {
    let content = " ";
    let produk = result.produk;
    $.each(produk, function (index, data) {
      let diskon = data.diskon;
      let harga = parseInt(data.harga);
      let hargaDiskon = (diskon / 100) * harga;
      let totalHarga = harga - hargaDiskon;
      if (kategori == data.kategori) {
        $(".title-produk").html(
          `<img src="${data.gambar.liga}" width="30"> ${data.kategori}</img>`
        );
        content += `
          <div class="col-6 col-lg-3 mb-3">
            <a href="index.html" class="text-decoration-none text-dark detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.nama}">
              <div class="card mt-4 mt-lg-0 shadow">
                <img
                  src="${data.gambar.klub[0]}"
                  class="card-img-top"
                  alt="jersey arsenal home 2022/2023"
                />
                <div class="card-body">
                  <p class="card-text">${data.nama}</p>
                  <h5 class="card-title fw-bold">Rp ${data.harga}</h5>
                  
                  <p class="card-text d-inline-block">
                    ${data.kota}
                  </p>
                </div>
                <div class="card-footer">
                  <p class="card-text">
                    <i class="fa-solid fa-star text-warning"></i> ${data.rating} | Terjual
                    ${data.terjual}
                  </p>
                </div>
              </div>
            </a>
          </div>
           `;
        $("#list-produk").html(content);
        $("#hero").hide();
        if (diskon) {
          $(".title-produk").html(
            `<img src="${data.gambar.liga}" width="30"> ${data.kategori}</img>`
          );
          content += `
        <div class="col-6 col-lg-3 mb-3 mb-lg-5">
            <a href="index.html" class="text-decoration-none text-dark detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.nama}">
              <div class="card mt-4 mt-lg-0 shadow">
                <img
                  src="${data.gambar.klub[0]}"
                  class="card-img-top"
                  alt="jersey arsenal home 2022/2023"
                />
                <div class="card-body">
                  <p class="card-text">${data.nama}</p>
                  <h5 class="card-title fw-bold">Rp ${totalHarga}</h5>
                  <span class="d-sm-inline-block bg-warning px-1 me-2 rounded">
                    Diskon ${data.diskon}%
                  </span>
                  <p class="card-text d-inline-block text-decoration-line-through">
                    Rp ${data.harga}
                  </p>
                </div>
                <div class="card-footer">
                  <p class="card-text">
                    <i class="fa-solid fa-star text-warning"></i> ${data.rating} | Terjual
                    ${data.terjual}
                  </p>
                </div>
              </div>
            </a>
          </div>
        `;
          $("#list-produk").html(content);
          $("#hero").hide();
        }
      }
    });
  });
});

//  Detail Produk
$("#list-produk").on("click", ".detail", function () {
  $("#section-2").show();
  $("#hero").hide();
  $("#judul-produk").hide();
  $("#list-produk").hide();
  $("#selengkapnya").hide();
  $("#liga").hide();
  $(".whatsapp-fixed").hide();
  let klik = $(this).data("id");
  console.log(klik);
  $.getJSON("data/produk.json", function (result) {
    let produk = result.produk;
    $.each(produk, function (index, data) {
      let diskon = data.diskon;
      let harga = parseInt(data.harga);
      let hargaDiskon = (diskon / 100) * harga;
      let totalHarga = harga - hargaDiskon;
      if (klik == produk[index].nama && diskon) {
        $("#breadcrumb").html(
          `
             <div class="col-12">
              <nav class="mt-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a class="text-decoration-none text-warning" href="index.html"
                      >Beranda</a
                    >
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-decoration-none text-warning" href="#"
                      >${data.kategori}</a
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    ${data.nama.slice(0, -9).toLowerCase()}
                  </li>
                </ol>
              </nav>
            </div>
          `
        );
        $("#detail-gambar").html(
          `
           <!-- Button trigger modal -->
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="false"
        >
          <div class="carousel-inner rounded">
            <!-- Slide 1 -->
            <div class="carousel-item active">
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[0]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
            <!-- Slide 2 -->
            <div class="carousel-item">
              <!-- <img src="..." class="d-block w-100" alt="..." /> -->
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[1]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
            <!-- Slide 3 -->
            <div class="carousel-item">
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[2]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
            <!-- Slide 4 -->
            <div class="carousel-item">
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[3]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
          </div>
          <div class="carousel-indicators position-relative top-100">
            <!-- indicator 1 -->
            <img
              src="${data.gambar.klub[0]}"
              alt="arsenal home depan"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active w-25 h-75"
              aria-current="true"
              aria-label="Slide 1"
            />
            <!-- indicator 2 -->
            <img
              src="${data.gambar.klub[1]}"
              alt="arsenal home belakang"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              class="w-25 h-75"
              aria-label="Slide 2"
            />
            <!-- indicator 3 -->
            <img
              src="${data.gambar.klub[2]}"
              alt="arsenal zoom"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              class="w-25 h-75"
              aria-label="Slide 3"
            />
            <!-- indicator 4 -->
            <img
              src="${data.gambar.klub[3]}"
              alt="arsenal logo"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              class="w-25 h-75"
              aria-label="Slide 4"
            />
          </div>
        </div>

         <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  ${data.nama}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner rounded">
                    <div class="carousel-item active">
                      <img
                        src="${data.gambar.klub[0]}"
                        class="d-block w-100"
                        alt="arsenal home depan"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${data.gambar.klub[1]}"
                        class="d-block w-100"
                        alt="arsenal home belakang"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${data.gambar.klub[2]}"
                        class="d-block w-100"
                        alt="arsenal zoom"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${data.gambar.klub[3]}"
                        class="d-block w-100"
                        alt="arsenal logo"
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon bg-dark rounded-circle"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon bg-dark rounded-circle"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="modal-footer">
                <div
                  class="alert p-1 text-center border border-2 border-secondary shadow w-100"
                >
                  <img
                    src="${data.gambar.liga}"
                    alt="premier league"
                    width="20"
                  />
                  ${data.kategori}
                </div>
                <button type="button" class="btn btn-warning shadow w-100">
                  <i class="fa-solid fa-cart-plus me-2"></i> Masukkan keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
          `
        );
        $("#detail-produk").html(
          `
          <h5>${data.nama}</h5>
        <ul class="list-unstyled mt-3 d-flex gap-md-3">
          <li>
            <a class="text-decoration-none me-2 me-lg-0" href="">
              <u class="text-secondary me-1">${data.rating}</u>
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a
              class="border-start border-2 ps-2 text-decoration-none text-secondary me-2 me-lg-0"
              href=""
              ><u>100</u> Penilaian</a
            >
          </li>
          <li>
            <p class="border-start border-2 ps-2">${data.terjual} Terjual</p>
          </li>
          <li>
            <a class="border-start border-2 ps-2 d-none d-md-inline" href=""
              >Laporkan</a
            >
          </li>
        </ul>
        <p class="display-6 text-warning bg-light p-2 rounded">
          Rp ${totalHarga}
          <span class="text-decoration-line-through text-dark lead"
            >Rp ${data.harga}</span
          >
        </p>
        <form action="">
          <div class="my-4">
            <p class="d-inline-flex me-4">Pengiriman</p>
            <select
              class="form-select d-inline-flex"
              aria-label="Default select example"
              style="cursor: pointer"
            >
              <option selected>Jakarta Timur</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Utara">Jakarta Utara</option>
            </select>
          </div>
          <div class="my-4">
            <p class="d-inline-block me-4">Ukuran </p>
            <!-- Ukuran S -->
             <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative me-2 size-button"
            >
              <label for="flexRadioDefault1" style="cursor: pointer">S</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
            </a>
            <!-- Ukuran M -->
            <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative me-2 size-button" 
            >
              <label for="flexRadioDefault2" style="cursor: pointer">M</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
            </a>
            <!-- Ukuran L -->
            <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative me-2 size-button" 
            >
              <label for="flexRadioDefault3" style="cursor: pointer">L</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
              />
            </a>
            <!-- Ukuran XL -->
            <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative size-button" 
            >
              <label for="flexRadioDefault4" style="cursor: pointer">XL</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
              />
            </a>
          </div>
          <div class="my-4">
            <p class="d-inline-block me-4">Kuantitas </p>
             <input
              class="form-control border d-inline text-center w-25"
              type="number"
              name=""
              id=""
              value="1"
              min="1"
            />
            <p class="d-inline fs-6 ms-2">tersisa ${500 - data.terjual} buah</p>
          </div>
          <button type="button" class="btn btn-outline-warning me-2">
            <i class="fa-solid fa-cart-plus me-2"></i>Masukkan keranjang
          </button>
          <button type="button" class="btn btn-warning">Beli Sekarang</button>
        </form>
        <p class="mt-4">
          Bagikan :
          <span class="ms-2">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              class="text-decoration-none me-2"
            >
              <i class="fa-brands fa-whatsapp fa-solid text-success fs-5"></i>
            </a>
            <a href="" class="text-decoration-none me-2">
              <i class="fa-brands fa-facebook text-primary fs-5"></i>
            </a>
            <a
              href="https://instagram.com/mchdysf"
              target="_blank"
              class="text-decoration-none me-2"
            >
              <i class="fa-brands fa-instagram text-danger fs-5"></i>
            </a>
            <a href="https://twitter.com/mchdysf" target=_blank class="text-decoration-none">
              <i class="fa-brands fa-twitter text-info fs-5"></i>
            </a>
          </span>
        </p>
          `
        );
        $("#spesifikasi-produk").html(
          `
           <div class="col-12">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <!-- Spesifikasi Produk -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button
                class="accordion-button bg-light text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Spesifikasi Produk
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-body">
                <!-- Jenis Kelamin -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Jenis Kelamin</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>Pria</p>
                  </div>
                </div>
                <!-- Jenis Olahraga -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Jenis Olahraga</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>Sepak Bola & Futsal</p>
                  </div>
                </div>
                <!-- Bahan -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Bahan</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>Jersey</p>
                  </div>
                </div>
                <!-- Stok -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Stok</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>${500 - data.terjual}</p>
                  </div>
                </div>
                <!-- Dikirim Dari -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Dikirim Dari</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>${data.kota}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <!-- Deskripsi Produk -->
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button
                class="accordion-button collapsed bg-light text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Deskripsi Produk
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <div class="accordion-body">
                <p>READY SIZE : S M L XL</p>
                <p>S: Lebar 50 Cm x Panjang 72 Cm</p>
                <p>M: Lebar 52 Cm x Panjang 74 Cm</p>
                <p>L: Lebar 54 Cm x Panjang 76 Cm</p>
                <p>XL: Lebar 58 Cm x Panjang 78 Cm</p>
                <p>Nb : toleransi size -+ 3cm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
          `
        );
      } else if (klik == produk[index].nama) {
        $("#breadcrumb").html(
          `
             <div class="col-12">
              <nav class="mt-3" aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a class="text-decoration-none text-warning" href="index.html"
                      >Beranda</a
                    >
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-decoration-none text-warning" href="#"
                      >${data.kategori}</a
                    >
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    ${data.nama.slice(0, -9).toLowerCase()}
                  </li>
                </ol>
              </nav>
            </div>
          `
        );
        $("#detail-gambar").html(
          `
           <!-- Button trigger modal -->
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-bs-ride="false"
        >
          <div class="carousel-inner rounded">
            <!-- Slide 1 -->
            <div class="carousel-item active">
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[0]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
            <!-- Slide 2 -->
            <div class="carousel-item">
              <!-- <img src="..." class="d-block w-100" alt="..." /> -->
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[1]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
            <!-- Slide 3 -->
            <div class="carousel-item">
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[2]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
            <!-- Slide 4 -->
            <div class="carousel-item">
              <a
                href="#"
                role="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ><img
                  class="img-fluid"
                  src="${data.gambar.klub[3]}"
                  alt="${data.nama}"
                />
              </a>
            </div>
          </div>
          <div class="carousel-indicators position-relative top-100">
            <!-- indicator 1 -->
            <img
              src="${data.gambar.klub[0]}"
              alt="..."
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              class="active w-25 h-75"
              aria-current="true"
              aria-label="Slide 1"
            />
            <!-- indicator 2 -->
            <img
              src="${data.gambar.klub[1]}"
              alt="..."
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              class="w-25 h-75"
              aria-label="Slide 2"
            />
          </div>
        </div>

         <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  ${data.nama}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div
                  id="carouselExampleControls"
                  class="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div class="carousel-inner rounded">
                    <div class="carousel-item active">
                      <img
                        src="${data.gambar.klub[0]}"
                        class="d-block w-100"
                        alt="arsenal home depan"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${data.gambar.klub[1]}"
                        class="d-block w-100"
                        alt="arsenal home belakang"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${data.gambar.klub[2]}"
                        class="d-block w-100"
                        alt="arsenal zoom"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${data.gambar.klub[3]}"
                        class="d-block w-100"
                        alt="arsenal logo"
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon bg-dark rounded-circle"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon bg-dark rounded-circle"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div class="modal-footer">
                <div
                  class="alert p-1 text-center border border-2 border-secondary shadow w-100"
                >
                  <img
                    src="${data.gambar.liga}"
                    alt="premier league"
                    width="20"
                  />
                  ${data.kategori}
                </div>
                <button type="button" class="btn btn-warning shadow w-100">
                  <i class="fa-solid fa-cart-plus me-2"></i> Masukkan keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
          `
        );
        $("#detail-produk").html(
          `
          <h5>${data.nama}</h5>
        <ul class="list-unstyled mt-3 d-flex gap-md-3">
          <li>
            <a class="text-decoration-none me-2 me-lg-0" href="">
              <u class="text-secondary me-1">${data.rating}</u>
              <i class="fa fa-star text-warning" aria-hidden="true"></i>
            </a>
          </li>
          <li>
            <a
              class="border-start border-2 ps-2 text-decoration-none text-secondary me-2 me-lg-0"
              href=""
              ><u>100</u> Penilaian</a
            >
          </li>
          <li>
            <p class="border-start border-2 ps-2">${data.terjual} Terjual</p>
          </li>
          <li>
            <a class="border-start border-2 ps-2 d-none d-md-inline" href=""
              >Laporkan</a
            >
          </li>
        </ul>
        <p class="display-6 text-warning bg-light p-2 rounded">
          Rp ${data.harga}
        </p>
        <form action="">
          <div class="my-4">
            <p class="d-inline-flex me-4">Pengiriman</p>
            <select
              class="form-select d-inline-flex"
              aria-label="Default select example"
              style="cursor: pointer"
            >
              <option selected>Jakarta Timur</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Utara">Jakarta Utara</option>
            </select>
          </div>
          <div class="my-4">
            <p class="d-inline-block me-4">Ukuran </p>
            <!-- Ukuran S -->
             <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative me-2 size-button"
            >
              <label for="flexRadioDefault1" style="cursor: pointer">S</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
            </a>
            <!-- Ukuran M -->
            <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative me-2 size-button" 
            >
              <label for="flexRadioDefault2" style="cursor: pointer">M</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault2"
              />
            </a>
            <!-- Ukuran L -->
            <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative me-2 size-button" 
            >
              <label for="flexRadioDefault3" style="cursor: pointer">L</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault3"
              />
            </a>
            <!-- Ukuran XL -->
            <a
              class="btn border shadow-sm d-inline-flex flex-column position-relative size-button" 
            >
              <label for="flexRadioDefault4" style="cursor: pointer">XL</label>
              <input
                class="form-check-input border border-0 rounded-0 shadow-none position-absolute bottom-50 end-0"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault4"
              />
            </a>
          </div>
          <div class="my-4">
            <p class="d-inline-block me-4">Kuantitas </p>
             <input
              class="form-control border d-inline text-center w-25"
              type="number"
              name=""
              id=""
              value="1"
              min="1"
            />
            <p class="d-inline fs-6 ms-2">tersisa ${500 - data.terjual} buah</p>
          </div>
          <button type="button" class="btn btn-outline-warning me-2">
            <i class="fa-solid fa-cart-plus me-2"></i>Masukkan keranjang
          </button>
          <button type="button" class="btn btn-warning">Beli Sekarang</button>
        </form>
        <p class="mt-4">
          Bagikan :
          <span class="ms-2">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              class="text-decoration-none me-2"
            >
              <i class="fa-brands fa-whatsapp fa-solid text-success fs-5"></i>
            </a>
            <a href="" class="text-decoration-none me-2">
              <i class="fa-brands fa-facebook text-primary fs-5"></i>
            </a>
            <a
              href="https://instagram.com/mchdysf"
              target="_blank"
              class="text-decoration-none me-2"
            >
              <i class="fa-brands fa-instagram text-danger fs-5"></i>
            </a>
            <a href="https://twitter.com/mchdysf" target=_blank class="text-decoration-none">
              <i class="fa-brands fa-twitter text-info fs-5"></i>
            </a>
          </span>
        </p>
          `
        );
        $("#spesifikasi-produk").html(
          `
           <div class="col-12">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <!-- Spesifikasi Produk -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button
                class="accordion-button bg-light text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Spesifikasi Produk
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-body">
                <!-- Jenis Kelamin -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Jenis Kelamin</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>Pria</p>
                  </div>
                </div>
                <!-- Jenis Olahraga -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Jenis Olahraga</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>Sepak Bola & Futsal</p>
                  </div>
                </div>
                <!-- Bahan -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Bahan</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>Jersey</p>
                  </div>
                </div>
                <!-- Stok -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Stok</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>${500 - data.terjual}</p>
                  </div>
                </div>
                <!-- Dikirim Dari -->
                <div class="row">
                  <div class="col-5 col-lg-2">
                    <label for="">Dikirim Dari</label>
                  </div>
                  <div class="col-7 col-lg-10">
                    <p>${data.kota}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <!-- Deskripsi Produk -->
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button
                class="accordion-button collapsed bg-light text-dark"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Deskripsi Produk
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <div class="accordion-body">
                <p>READY SIZE : S M L XL</p>
                <p>S: Lebar 50 Cm x Panjang 72 Cm</p>
                <p>M: Lebar 52 Cm x Panjang 74 Cm</p>
                <p>L: Lebar 54 Cm x Panjang 76 Cm</p>
                <p>XL: Lebar 58 Cm x Panjang 78 Cm</p>
                <p>Nb : toleransi size -+ 3cm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
          `
        );
      }
    });
  });
});

//  Halaman Login
$("#checkbox").on("click", function () {
  if ($(this).is(":checked")) {
    $("#sandi").attr("type", "text");
  } else {
    $("#sandi").attr("type", "password");
  }
});
