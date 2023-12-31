import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calculator';

  // Listens to the inputs on the calculator buttons
  @HostListener('click', ['$event.target']) onClick(e: Element) {
    // converts clicked HTML to string
    let clicked = e.innerHTML;
    let tempResult = document.createTextNode(clicked);

    // Array and var to store temp numbers
    var numList = [];
  const logicList = /[0-9.*/]|-/;
    let tempNum;
    let tempStr!: string;

    // Gets input field from DOM
    let inputField = document.getElementById('input');
    let inputFieldTxt = inputField?.innerHTML;
    let tempInputField;

    let outputField = document.getElementById('output');
    let outputFieldTxt = outputField?.innerHTML;
    let tempOutput;
    
    // Adds number to input field
    if(['1','2','3','4','5','6','7','8','9','0','.'].includes(clicked)) {
      inputField?.appendChild(tempResult);
    }
    // Converts the number into a percentage
    else if (clicked == "%") {
      if (inputFieldTxt != null && inputFieldTxt != "")
      {
        tempNum =  parseFloat(inputFieldTxt);
        tempNum = tempNum / 100;
        tempResult = document.createTextNode(tempNum.toString())
        inputField!.innerHTML = "";
        inputField?.appendChild(tempResult)
      }
      // Handles error if field is blank
      else {
        alert("ERROR: Please input a number to convert into a percentage!");
      }
    }

    // converts number from positive to negative and in reserve
    else if (clicked == "+/-") {
      if (inputFieldTxt != null && inputFieldTxt != "") {
        if (inputFieldTxt.includes("-")) {
          inputFieldTxt = inputFieldTxt.slice(1);
          tempResult = document.createTextNode(inputFieldTxt);
          inputField!.innerHTML = "";
          inputField?.appendChild(tempResult);

        }
        else {
          inputFieldTxt = "-" + inputFieldTxt;
          tempResult = document.createTextNode(inputFieldTxt);
          inputField!.innerHTML = "";
          inputField?.appendChild(tempResult);
        }
      }
    }

    // appends a logic operator to the string after inputting a number
    // allows to change operator if needed until a new number is inputted
    else if (['÷','+','-','x'].includes(clicked)) {
      if (inputFieldTxt != null && inputFieldTxt != "") {
        tempNum =  parseFloat(inputFieldTxt);
        numList.push(tempNum);
        for (let x = 0; x < numList.length; x++) {
          tempStr = " " + numList[x] + " " + clicked;
        }
        tempOutput = document.createTextNode(tempStr);
        outputField?.appendChild(tempOutput);
        inputField!.innerHTML = "";
      }
      else if (outputFieldTxt != null && outputFieldTxt != "") {
        tempStr = outputFieldTxt;
        tempStr = tempStr.slice(0, -1);
        tempStr = tempStr + clicked;
        tempOutput = document.createTextNode(tempStr);
        outputField!.innerHTML = "";
        outputField?.appendChild(tempOutput);
      }
      else
      {
        alert("ERROR");
      }
    }

    // clears the current input field (not the previous inputs)
    else if (clicked == "AC") {
      inputField!.innerHTML = "";
    }

    // clears all inputs;
    else if (clicked == "C") {
      inputField!.innerHTML = "";
      outputField!.innerHTML = "";
      numList = [];
    }

    // calculates the string (validation included)
    else if (clicked == "=" && outputFieldTxt != null && inputFieldTxt != null) {
      outputFieldTxt = outputFieldTxt.replace(/x/g, "*");
      outputFieldTxt = outputFieldTxt.replace(/÷/g, "/");


      tempInputField = eval((outputFieldTxt + inputFieldTxt));
      if (logicList.test(tempInputField)) {
        tempInputField = document.createTextNode(tempInputField);
        outputField!.innerHTML = "";
        inputField!.innerHTML = "";
        numList = [];
        inputField?.appendChild(tempInputField);
      }
      else {
        alert("ERROR: Unauthorized input found!");
        outputField!.innerHTML = "";
        inputField!.innerHTML = "";
        numList = [];
      }

    }
  }
}
