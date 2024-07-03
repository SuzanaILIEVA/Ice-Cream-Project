import { render, screen } from "@testing-library/react";
import Card from ".";
import userEvent from "@testing-library/user-event";
import { Button } from "bootstrap";

//*prop olarak veri alan bir bileseni test ediyorsak bilesenin aldigi
//proplari test ortamindada gondermemiz gerekir .

const item = {
  id: "f3b1",
  imagePath: "/images/chocolate.png",
  name: "Chocolate",
};

// amount propuna rasgele bir deger verdik bos kalmasin diye
test("Miktar, baslik ve fotograf gelen propa gore ekrana basilir ", () => {
  render(
    <Card
      item={item}
      amount={4}
      addToBasket={() => {}}
      removeFromBasket={() => {}}
    />
  );

  // miktar spanini cagir
  const amount = screen.getByTestId("amount");

  // span icerigi 4 mi kontrol et
  expect(amount.textContent).toBe("4");

  // Chocolate yazizi ekrana geldimi kontrol et (getBy.. : elementi bulamazsa hata firlatir
  //bu yuzden sadece yazi icerigine sahip eleman ekranda mi kontrolu yapmak istiyorsak getByText ile
  //elementi cagirmak yeterlidir daha sonrasinda expect kullanmaya bile gerek kalmaz )
  screen.getByText("Chocolate");

  //resmin elementini cagir
  const image = screen.getByAltText("cesit-resim");

  //resmin kaynagi dogrumu kontrol et
  expect(image).toHaveAttribute("src", "/images/chocolate.png");
});

// ekle azalt butonlarında çalışıcak fonksiyonların testleri.
test("Butonlara tıklanınca fonksiyonlar doğru parametre ile çalışır", async () => {
  const user = userEvent.setup();

  // prop olarak gönderilen fonksiyonu test ediceksek jest.fn() aracılığı ile
  // test  ediliebilir mock fonksiyonu oluşturup bunlari kullaniriz.
  const addMockFn = jest.fn();
  const removeMockFn = jest.fn();

  // bileseni renderla
  render(
    <Card
      item={item}
      amount={5}
      addToBasket={addMockFn}
      removeFromBasket={removeMockFn}
    />
  );

  // butonlari al
  const addBtn = screen.getByRole("button", { name: /ekle/i });
  const delBtn = screen.getByRole("button", { name: /azalt/i });

  // ekle butonuna tikla
  await user.click(addBtn);

  // addToBasket fonksiyonu dogru parametreler ile cagirildi mi ?
  expect(addMockFn).toHaveBeenCalledWith(item);

  //azalt butonuna tikla
  await user.click(delBtn);

  //removeFromBasket fonksiyonu dogru parametreler ile calisiyor mu?
  expect(removeMockFn).toHaveBeenCalledWith(item.id);
});

// Azalt butonunu aktiflik testleri
//* describe methodu ile ayni olaya dair birden fazla test yaziyorsak (orn: Azalt butonunu aktiflik testleri)
// bunlari bir kapsayicida toplamamiza olanak saglar .
describe("azalt butonu aktiflik testleri", () => {
  it("miktar 1'den fazla ise button aktiftir", () => {
    render(<Card item={item} amount={3} />);

    //azalt butonunu al
    const button = screen.getByRole("button", { name: "Azalt" });

    //button aktifmi
    expect(button).toBeEnabled();
  });

  it("miktar 0 ise button inaktiftir", () => {
    render(<Card item={item} amount={0} />);

    //azalt butonunu al
    const button = screen.getByRole("button", { name: "Azalt" });

    // button inaktifmi
    expect(button).toBeDisabled();
  });
});
