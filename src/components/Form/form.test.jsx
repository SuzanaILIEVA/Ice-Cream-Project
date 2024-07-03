import { fireEvent, render, screen } from "@testing-library/react"
import Form from "."

test("kosullarin onaylanma durumuna gore buton aktifligi", ()=>{
    //1)test edilecek bilesen render edilir 
    render(<Form/>)

    //2)gerekli elementeri cagir (checkedbox | button)
    const button = screen.getByRole("button")
    const checkbox = screen.getByRole("checkbox")

    //3)checkedbox tiklenmemis mi kontrol et 
    expect(checkbox).not.toBeChecked()

    //4)button inaktif mi kontrol et 
    expect(button).toBeDisabled()

    //5)checkedbox'i tikle
    fireEvent.click(checkbox)

    //6)buton aktifmi kontrol et 
    expect(button).toBeEnabled()

    //7)checkedbox'tan tiki kaldir
    fireEvent.click(checkbox)

    //8)button inaktif mi kontrol et 
    expect(button).toBeDisabled()

})

test("butonun hover durumuna gore bildirim gorunur", ()=>{
    //1-renderla
    render(<Form/>)

    //2- gerekli elementleri  al
    const checkbox = screen.getByRole("checkbox")
    const button = screen.getByRole("button")
    // screen.getByAltText("Size gerçekten birşey teslim etmeyeceğiz")
    //yerine regexle slash icinde yazinin bir kismini alabilirsin. "i" buyuk kucuk harf duyarliligini kaldiriyor
    const alert = screen.getByText(/size gerçekten/i)

    //3-bildirimin ekranda olmadigini kontrol et 
    expect(alert).not.toBeVisible()
 
    //4-checkbox'i tikle
    fireEvent.click(checkbox)
   
    //5- Mouse'u butonun uzerine getir
    fireEvent.mouseEnter(button)

    //6-ekranda bildirim varmi kontrol et 
    expect(alert).toBeVisible()

    //7-mouse'u butondan cek 
    fireEvent.mouseLeave(button)

    //8-bildirimin ekranda olmadigini kontrol et 
    expect(alert).not.toBeVisible()


})