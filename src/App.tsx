import React, { ChangeEvent } from 'react'

interface AppState {
    name?: string
    birthdate: string
    lifePathNumber: number | null
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            name: '',
            birthdate: '',
            lifePathNumber: null
        }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target
        this.setState(prevState => ({
            ...prevState,
            [name]: value === '' ? undefined : value
        }))
    }

    calculateLifePath = (): void => {
        const { birthdate, name } = this.state
        if (name !== undefined && name.trim() !== '') {
            const birthdateDate = new Date(birthdate)
            const day = birthdateDate.getDate()
            const month = birthdateDate.getMonth() + 1 // Months are zero-based
            const year = birthdateDate.getFullYear()
            const lifePathNumber = this.calculateLifePathNumber(day, month, year)
            this.setState({ lifePathNumber })
        }
    }
      
    calculateLifePathNumber(day: number, month: number, year: number): number {
        const sumDigits = (num: number) => num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0)
        const dayNumber = sumDigits(day)
        const monthNumber = sumDigits(month)
        const yearNumber = sumDigits(year)
        const finalSum = sumDigits(dayNumber + monthNumber + yearNumber)
        return finalSum
    }

    render() {
        const { name, birthdate, lifePathNumber } = this.state
        return (
            <div className="calculator-container">
                <h1>Life Path Number Calculator</h1>
                <div className="input-container">
                    <label htmlFor="name">Your Name:</label>
                    <input type="text" id="name" name="name" value={name} onChange={this.handleInputChange} />
                </div>
                <div className="input-container">
                    <label htmlFor="birthdate">Your Birthdate:</label>
                    <input type="date" id="birthdate" name="birthdate" value={birthdate} onChange={this.handleInputChange} />
                </div>
                <button onClick={this.calculateLifePath}>Calculate</button>
                {lifePathNumber !== null && (
                    <div id="result">
                        Dear {name}, your Life Path Number is: {lifePathNumber}
                    </div>
                )}
                {lifePathNumber !== null && (
                    <div className="explanation">
                        <p>
                            The Life Path Number is a key element in numerology. It is calculated based on your birthdate
                            and represents the traits and lessons that you are meant to learn in this lifetime. Each number
                            has its own unique characteristics, so your Life Path Number can provide insights into your
                            personality and purpose.
                        </p>
                        <p>
                            Take a moment to reflect on the significance of your Life Path Number and how it may influence
                            your journey. Remember, it's a tool for self-discovery and personal growth.
                        </p>
                    </div>
                )}
            </div>
        )
    }
}
export default App
