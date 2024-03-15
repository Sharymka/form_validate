"use strict";

class Validator {
  constructor(form) {
    this.form = form;
    this.errors = {
      name: "Имя должно содержать только буквы!",
      phone: "+7(000)000-0000!",
      email: "mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru"
    };
    this.patterns = {
      name: /^[a-z\s]+$/i,
      phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/g,
      email: /^[a-z]{2}[\.|-]?[a-z]{4}\@[a-z]+\.[a-z]{2,}$/gi
    }
    this.valid = false;
    this.errorClass = 'error_msg';
    this._validateForm();
  }

  _validateForm() {

    let errorBlocks = [...document.getElementsByClassName('error_msg')];

    for (let errorBlock of errorBlocks) {
      errorBlock.remove();
    }

    let inputs = [...document.getElementById('myForm').getElementsByTagName('input')];

    for (let input of inputs) {
      this._validate(input);
    }

    if (![...document.getElementById('myForm').getElementsByClassName('invalid')].length) {
      this.valid = true;
    }
  }

  _validate(input) {

    if(this.patterns[input.name]) {
      if (!this.patterns[input.name].test(input.value)) {
        input.classList.add('invalid');
        this._addErrMsg(input);
        this._watchInput(input);
      }
    }

  }

  _addErrMsg(input) {
    let errBlock = document.createElement("div");
    errBlock.innerHTML = this.errors[input.name];
    errBlock.classList.add(this.errorClass);
    input.parentNode.appendChild(errBlock);
  }

  _watchInput(input) {
    input.addEventListener('input', (e) => {
        let error = input.parentNode.getElementsByClassName(this.errorClass);
        if (this.patterns[input.name].test(input.value)) {
            input.classList.remove('invalid');
            input.add.classList('valid');
        }
    });
  }

}