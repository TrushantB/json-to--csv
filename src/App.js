import React, { Component } from 'react'
import axios from 'axios';
import Workbook from 'react-excel-workbook';
export default class App extends Component {
      constructor() {
          super();
          this.state={
            dataSource:[],
            sheets:[]
          }
          axios.get('http://localhost:3005/customer').then((response) => {
            this.setState({dataSource:response.data})
          })
      }
    render() {
         for(let entry in this.state.dataSource[0]) {
           this.state.sheets.push(
               //this.state.dataSource[0][entry] is array
             <Workbook.Sheet data={this.state.dataSource[0][entry]} name={entry} key ={entry}>
                <Workbook.Column label="id" value={row => row.id}/>
                <Workbook.Column label="name" value={row => row.name}/>
                <Workbook.Column label="buff" value={row => row.buff}/>
                <Workbook.Column label="cow" value={row => row.cow}/>
                <Workbook.Column label="date" value={row => row.date}/>
            </Workbook.Sheet>
           )
         }
         
        return (
            <div>
               <div className="row text-center" style={{marginTop: '100px'}}>
                    <Workbook filename="example.csv" element={<button className="btn btn-lg btn-primary">Try me!</button>}>
                      {this.state.sheets}
                    </Workbook>
                 </div>
            </div>
        )
    }
}
