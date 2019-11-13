clear();
const doSomeStuff = () => {
  const domBody = document.querySelector("body");
  domBody.innerHTML = `
<div class='main-container'>
  <div class='form-container'>
		<p class='form-Header'>Your Name: </p>
      <div class='name-input'>
      <label for='main-input'>Enter First Name</label>
    <input id='main-input' type='text'/>
		</div>
  </div>
</div>
`;

  let firstName = "";

  const updateFirstName = event => {
    if (firstName.length === 0 && event.data) {
      firstName = event.data;
      console.log(firstName);
      updateOutput();
      return;
    }
    const name = firstName.trim().split("");
    if (!event.data) {
      name.pop();
      firstName = name.join("");
      console.log(firstName);
      updateOutput();
      return;
    }

    firstName = `${firstName}${event.data}`;
    updateOutput();
    return;
  };

  const updateOutput = () => {
    const formHeader = document.querySelector(".form-Header");
    const currentName = firstName.substring(0, firstName.length - 1);
    const currentText = formHeader.innerText;
    const nameStart = currentText.match(currentName).index;
    const nameEnd = nameStart + firstName.length;
    const startStr = currentText.substring(0, nameStart);
    const endStr = currentText.substring(nameEnd);
    formHeader.innerText = `${startStr}${firstName} ${endStr}`;
  };

  const formContainer = document.querySelector(".form-container");
  const nameInput = document.querySelectorAll(".name-input");
  const inputField = document.querySelector("input");
  const formHeader = document.querySelector(".form-Header");
  formHeader.style.textAlign = "center";
  formContainer.style.margin = "100px";
  inputField.addEventListener("input", e => updateFirstName(e));

  nameInput.forEach(field => {
    field.style.display = "flex";
    field.children[0].style.flexGrow = "1";
    field.children[0].style.lineHeight = "2";
    field.children[1].style.flexGrow = "2";
  });
};

doSomeStuff();
