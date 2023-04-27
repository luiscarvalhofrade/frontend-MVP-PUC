/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://localhost:9000/alunos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.alunos.forEach(aluno => insertList(aluno.nome, aluno.idade, aluno.matricula))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um(a) aluno(a) na turma do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputStudent, inputAge, inputAcademicId) => {
  const formData = new FormData();
  formData.append('nome', inputStudent);
  formData.append('idade', inputAge);
  formData.append('matricula', inputAcademicId);

  let url = 'http://localhost:9000/aluno';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um(a) aluno(a) da turma de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido(a)!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um(a) aluno(a) da turma do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://localhost:9000/aluno?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um(a) novo(a) aluno(a) com nome, idade e matricula 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputStudent = document.getElementById("newInput").value;
  let inputAge = document.getElementById("newAge").value;
  let inputAcademicId = document.getElementById("newAcademicId").value;

  if (inputStudent === '') {
    alert("Escreva o nome do(a)  aluno(a)!");
  } else if (isNaN(inputAge) || isNaN(inputAcademicId)) {
    alert("Idade e matricula precisam ser números!");
  } else {
    insertList(inputStudent, inputAge, inputAcademicId)
    postItem(inputStudent, inputAge, inputAcademicId)
    alert("Aluno(a) adicionado(a)!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nameStudent, age, academicId) => {
  var item = [nameStudent, age, academicId]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newAge").value = "";
  document.getElementById("newAcademicId").value = "";

  removeElement()
}