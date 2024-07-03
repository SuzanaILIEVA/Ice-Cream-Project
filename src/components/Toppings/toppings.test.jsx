import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Toppings from  "."

test("soslari ekleme ve cikarma isleminin toplam fiyata etkisi" , async ()=>{

    // userEvent kurulum
    const user = userEvent.setup();

    //1-bileseni renderla
    render(<Toppings/>)

    //2-butun sos checkboxlarini al 
    const toppings = await screen.findAllByRole("checkbox")

    //3-toplam spani al 
    const total = screen.getByTestId("total")

    //4- tum checkboxlarin tiksiz oldugunu kontrol et /birden fazla oldugu icin donerek konttrol ettik 
     // expect(toppings[0]).not.toBeChecked()//birtanesini konrol etme ornegi 
    toppings.forEach((i) => expect(i).not.toBeChecked())


    //5- toplam ucret sifirmi kontrol et 
    expect(total.textContent).toBe("0")

    //6-soslardan birine tikla 
    await user.click(toppings[2])

    //7-toplam ucret 3 mu kontrol et 
    expect(total.textContent).toBe("3")

    //8-farkli bir sos tikle
    await user.click(toppings[4])

    //9- tolam ucret 6 mi kontrol et 
    expect(total.textContent).toBe("6")

    //10- soslardan birinin tikini kaldir 
    await user.click(toppings[2])

    //11-toplam ucret 3 mu kontrol et 
    expect(total.textContent).toBe("3")

    //12- soslardan digerininde tikini kaldir 
    await user.click(toppings[4])

    //13- toplam ucret 0 mi kontrol et
    expect(total.textContent).toBe("0")

    

})