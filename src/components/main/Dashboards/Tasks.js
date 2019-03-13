import React, {Component} from 'react'

const data = [
    {id: 1, title: 'Zmiana pliku RODO', date: new Date()},
    {id: 2, title: 'Dodanie nowego klienta', date: new Date()},
    {id: 3, title: 'Dodanie nowego zgłoszenia', date: new Date()},
    {id: 4, title: 'Edycja zamówienia nr 1', date: new Date()},
    {id: 5, title: 'Utworzenie ról', date: new Date()},
    {id: 6, title: 'Zmiana zdjęcia w mailu ', date: new Date()},
    {id: 7, title: 'Zmiana tekstu w mailu ', date: new Date()}
]

export default class TasksDash extends Component {
    tableDataFunction = () => {
        return data.map(one =>[
            <tr>
                <th> #{one.id} </th>
                <th> {one.title} </th>
                <th> {one.date.toLocaleDateString()} </th>
            </tr>
        ])
    }
    render() {
        return ( 
            <div className='tasksListDash'>
                <div style={{height:'12%'}}> <p className='cardName'> Tasks list </p> </div>
                
                <div className='scrollableDiv'>
                    <table className='tasksTableHead'>
                        {/* <thead>
                            <th id = 'id'>ID</th>
                            <th id = 'title'>Title</th>
                            <th id = 'date'>Date</th>
                        </thead> */}
                        <tbody>
                        {this.tableDataFunction()}
                        </tbody>
                    </table>
                </div>

                <div className='tasksAllButton'> <button> Show all </button></div>
            </div> 
        )
    }
}