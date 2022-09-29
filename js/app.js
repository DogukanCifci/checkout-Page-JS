//* ======================================================================
//*                 Checkout Page Solution
//* document tan değil mesela div den querySelector, map filter, dest,spread=======================================================================

let sepettekiler = [
  {
    name: "Vintage Backpack",
    price: 34.99,
    adet: 1,
    img: "./images/photo1.png",
  },
  { name: "Levi Shoes", price: 40.99, adet: 1, img: "./images/photo2.png" },
  { name: "Antique Clock", price: 69.99, adet: 1, img: "./images/photo3.jpg" },
];

//=====================EKRANA BASTIRMA ========================
sepettekiler.forEach((urun) => {
  //DESTRUCTURING
  const { name, price, adet, img } = urun;
  //Asagida tekrar urun.name/ urun.price vb yazmama gerek yok

  document.querySelector(
    "#product-rows"
  ).innerHTML += `<div class="card mb-3" style="max-width: 540px;">

  <div class="row g-0">

    <div class="col-md-5">
      <img src=${img} class="img-fluid rounded-start" alt="...">
    </div>

    <div class="col-md-7">

      <div class="card-body">
      
        <h5 class="card-title">${name}</h5>
        
             <div class="ürün-price">
                    <p class="text-warning h2">$
                      <span class="indirim-price">${(price * 0.7).toFixed(
                        2
                      )}</span>
                      <span class="h5 text-dark text-decoration-line-through">${price}</span>
                    </p>
                  </div>

                  
                  <div
                    class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                  >
                    <div class="adet-controller">
                      <button class="btn btn-secondary btn-sm">
                        <i class="fas fa-minus"></i>
                      </button>
                      <p class="d-inline mx-4" id="ürün-adet">${adet}</p>
                      <button class="btn btn-secondary btn-sm">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>

                  </div>

                  <div class="ürün-removal mt-4">
                    <button class="btn btn-danger btn-sm w-100 remove-ürün">
                      <i class="fa-solid fa-trash-can me-2"></i>Remove
                    </button>
                  </div>

                  <div class="mt-2">
                    Ürün Toplam: $<span class="ürün-toplam">${(
                      adet *
                      price *
                      0.7
                    ).toFixed(2)}</span>
                  </div>
      </div>
    </div>
  </div>
</div>`;
});

//=====================EKRANDAN SILME ========================

document.querySelectorAll(".remove-ürün").forEach((ürünBtn) => {
  ürünBtn.onclick = () => {
    removeSil(ürünBtn); //Hangi ürüne tiklanildiysa o ürün suan removesil fonksiyonuna gönderildi
  };
});

//Bu fonksiyonu böyle tanimlamamin sebebi yukarda bile tanimlamis olsak bu fonsiyonu cagirabiliriz. Diger kalan iki fonksiyon türünde asagida fonksiyonu cagiramiyorduk
function removeSil(ürünBtn) {
  //1.Yol
  //  ürünBtn.parentElement.parentElement.parentElement.parentElement.remove(); //Bu sekilde de yapabiliriz

  //2.Yol
  ürünBtn.closest(".card").remove();
  //closest(".card") oan en yakin card classina sahip yere gider. ve oraya kadar olan her yeri siler.

  //=====================DIZIDEN SILME ========================
  //Hala removeSil fonksiyonunun icindeyiz
  sepettekiler = sepettekiler.filter(
    (urun) =>
      urun.name != ürünBtn.closest(".card").querySelector("h5").textContent //.card mainine ulastim ve onun icindeki h5 e ulas dedim. document.querySelector ile ayni. coument tüm js kodu. document yerine article icindeki gibi article.querySlector vb yazabiliriz.
    //Yani burda dedik ki tikladigimiz remove butonunun parentlerindan en yakin card classli elementte git. O elemanin altindan h5 tagine sahip olan elementin icerigine bak. sectigimn ürünün ismi onunla esit degilse o listede kalsin. Esitse onu listeden sil
  );
  console.log(sepettekiler); //Listeden eksiliyor mu diye kontrol etmek icin
}

//===================== ADET DÜZENLEME========================

adetButton();

function adetButton() {
  document.querySelectorAll(".adet-controller").forEach((kutu) => {
    //adet-controller classli elementim var. + - ve adet belirten div. Onun icinden alttaki butonlara erisiyorum. Daha sonra bunlara tiklandiginda söyle olsun böyle olsun diye komut vericem
    //Birden fazla ürün oldugu icin hangisine tiklandigini algilamak amaciyla querySelectorAll ile hangisine tiklandigini kontrol ettik.

    const eksi = kutu.firstElementChild; //Bu sekilde eksi butonuna ulasmis olduk.Bunun yerine kutu.querySelector(".fa-minus") ' da diyebilirdim.Ama firstElementChild kendinin ilk cocugunu cagirir.Eksi butonu da ilk element oldugu icin bunu kullanabildik
    let adet = kutu.querySelector("#ürün-adet");

    const arti = kutu.lastElementChild; //Bu da .adet-controller classli elementin son cocugu' da + butonu

    eksi.addEventListener("click", () => {
      adet.textContent = adet.textContent - 1;
      //sepette de degistiricez
      sepettekiler.map((urun) => {
        if (
          urun.name == adet.closest(".card").querySelector("h5").textContent //hangisine tiklandiysa sadece onun adet degistirmek icin isimleri eslestirmek zorundayiz
        ) {
          urun.adet--;
        }
      });
    });
    arti.onclick = () => {
      adet.textContent = Number(adet.textContent) + 1;

      //sepettekini artirma
      sepettekiler.map((ürün) => {
        if (
          ürün.name == adet.closest(".card").querySelector("h5").textContent //hangisine tiklandiysa sadece onun adet degistirmek icin isimleri eslestirmek zorundayiz
        ) {
          ürün.adet++;
        }

        //----Ürün toplami ekrana bastirma
        let ürünToplam = arti.closest(".card").querySelector(".ürün-toplam");
        let ürünPrice = arti
          .closest(".card")
          .querySelector(".indirim-price").textContent;

        ürünToplam.textContent = (adet.textContent * ürünPrice).toFixed(2);
      });
    };
  });
}

console.log(sepettekiler);
