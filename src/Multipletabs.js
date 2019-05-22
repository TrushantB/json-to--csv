import React, { Component } from 'react'
import { Button } from 'antd';
import axios from 'axios';
export default class Multipletabs extends Component {
  constructor() {
    super();
    this.state={
      csvData:[]
    }
    axios.get('http://localhost:3005/customer').then((response) => {
      this.setState({csvData:response.data})
    })
  }
  exportCSV = () => {
   var csvRow=[];
   var A =[['id','customer','buff','date']];
   var re=this.state.csvData;

   for(var item=0; item < re.length; item++) {
     A.push([re[item].id,re[item].customer, re[item].buff,re[item].date]);
   }
   for(var i=0; i<A.length; ++i) {
    csvRow.push(A[i].join(",")) ;
   }
   var csvString=csvRow.join("%0A");

   var a=document.createElement("a");
   a.href='data:attachment/csv,' + csvString;
   a.target="_Blank";
   a.download="test.csv"
   document.body.appendChild(a);
   a.click();

   console.log(csvString)
  }
  render() {
    return (
      <div>
        <Button onClick={this.exportCSV}>Download CSV</Button>
      </div>
    )
  }
}
