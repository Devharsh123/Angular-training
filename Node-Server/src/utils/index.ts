export const firebaseUrl = 'https://firebasestorage.googleapis.com/v0/b/'

export class Utilities {
    getTotalAmount = async (price: number, tax?: number, discount?: number): Promise<number> => {
        const addTax = price * (tax / 100)
        const sellingPrice = price + addTax
        return (sellingPrice - (sellingPrice / 100) * discount)
    }
}

