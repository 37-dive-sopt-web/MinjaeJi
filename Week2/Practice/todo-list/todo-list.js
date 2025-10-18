const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-input");

// 투두 리스트 불러오기
document.addEventListener("DOMContentLoaded", loadToDoList);

function loadToDoList() {
  const savedToDoList = localStorage.getItem("todo-list");
  if (!savedToDoList) return;

  const todoItem = JSON.parse(savedToDoList);
  todoItem.forEach((todo) => renderToDo(todo.text));
}

todoInput.addEventListener("keypress", (e) => {
  // 엔터로 투두 입력
  if (e.key === "Enter") {
    addToDo(); // 투두 추가
    todoInput.value = "";
  }
});

const addBtn = document.querySelector("#add-button");
addBtn.addEventListener("click", addToDo); // 버튼 클릭했을 때 TODO 추가 핸들러 함수 실행

function addToDo() {
  if (todoInput.value == "") {
    alert("할 일을 입력해 주세요.");
    return;
  } // 빈 입력 방지

  renderToDo(todoInput.value);
  saveToDo(todoInput.value);

  todoInput.value = ""; // input 초기화
}

function renderToDo(text) {
  const newLi = document.createElement("li"); // li 생성
  const newContents = document.createElement("span"); // span 생성

  newLi.appendChild(newContents); // li 태그에 span 추가
  newContents.textContent = text; // input 값으로 들어온 text 추가
  todoList.appendChild(newLi);
}

function saveToDo(text) {
  // 로컬스토리지에 투두 저장
  const savedToDoList = JSON.parse(localStorage.getItem("todo-list")) || [];
  const newToDo = { text, createdAt: new Date().toISOString() };
  savedToDoList.push(newToDo);
  localStorage.setItem("todo-list", JSON.stringify(savedToDoList));
}

const delBtn = document.querySelector("#delete-button");
delBtn.addEventListener("click", () => {
  if (confirm("정말 삭제하시겠습니까?")) localStorage.clear();
}); // 모든 할 일 삭제
